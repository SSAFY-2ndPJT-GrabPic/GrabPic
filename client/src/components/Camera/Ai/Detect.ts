import * as tf from "@tensorflow/tfjs";
import { renderBoxes } from "./RenderBox";

// 클래스의 개수
const numClass: number = 25;

/**
 * 모델에 전달되기 전 이미지/프레임을 전처리합니다.
 * @param source HTMLVideoElement 또는 HTMLImageElement
 * @param modelWidth 모델의 너비
 * @param modelHeight 모델의 높이
 * @returns 입력 텐서, xRatio 및 yRatio
 */
const preprocess = (source: HTMLVideoElement | HTMLImageElement, modelWidth: number, modelHeight: number): [tf.Tensor4D, number, number] => {
    let xRatio: number = 0, yRatio: number = 0; // 상자에 대한 비율

    const input = tf.tidy(() => {
        const img = tf.browser.fromPixels(source);

        // 이미지를 정사각형으로 패딩합니다 => [n, m]에서 [n, n]으로, n > m
        const [h, w] = img.shape.slice(0, 2); // 소스의 너비와 높이 가져오기
        const maxSize = Math.max(w, h); // 최대 크기 가져오기
        const imgPadded = img.pad([
            [0, maxSize - h], // y 패딩 [하단만]
            [0, maxSize - w], // x 패딩 [오른쪽만]
            [0, 0],
        ]);

        xRatio = maxSize / w; // xRatio 업데이트
        yRatio = maxSize / h; // yRatio 업데이트

        return tf.image
            .resizeBilinear(imgPadded as tf.Tensor4D, [modelWidth, modelHeight]) // 프레임 크기 조정
            .div(255.0) // 정규화
            .expandDims(0); // 배치 추가
    });

    return [input as tf.Tensor4D, xRatio, yRatio];
};

/**
 * 추론을 실행하고 감지를 수행합니다.
 * @param source HTMLImageElement 또는 HTMLVideoElement
 * @param model 로드된 YOLOv8 TensorFlow.js 모델
 * @param canvasRef 캔버스 참조
 * @param callback 감지 프로세스 이후 실행할 함수
 */
export const detect = async (source: HTMLImageElement | HTMLVideoElement, model: { net: tf.GraphModel | null; inputShape: number[] }, canvasRef: HTMLCanvasElement, callback: () => void = () => { }): Promise<void> => {
    if(!model.net)  return;

    const [modelWidth, modelHeight] = model.inputShape.slice(1, 3); // 모델 너비 및 높이 가져오기

    tf.engine().startScope(); // TF 엔진 스코핑 시작
    const [input, xRatio, yRatio] = preprocess(source, modelWidth, modelHeight); // 이미지 전처리


    const res = model.net.execute(input) as tf.Tensor4D; // 모델 추론
    const transRes = res.transpose([0, 2, 1]); // 결과 전치 [b, det, n] => [b, n, det]
    const boxes = tf.tidy(() => {
        const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // 너비 가져오기
        const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // 높이 가져오기
        const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
        const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1
        return tf
            .concat(
                [
                    y1,
                    x1,
                    tf.add(y1, h), // y2
                    tf.add(x1, w), // x2
                ],
                2
            )
            .squeeze();
    }); // 상자 처리 [y1, x1, y2, x2]

    const [scores, classes] = tf.tidy(() => {
        // 클래스 점수
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze([0]); // #6은 1 클래스 모델만 처리하기 위해 axis 0만 squeeze
        return [rawScores.max(1), rawScores.argMax(1)];
    }); // 최대 점수 및 클래스 인덱스 가져오기

    const nms = await tf.image.nonMaxSuppressionAsync(boxes as tf.Tensor2D, scores, 500, 0.45, 0.2); // 상자 필터링을 위한 NMS

    const boxes_data = boxes.gather(nms, 0).dataSync() as Int32Array; // NMS 인덱스로 상자 색인화
    const scores_data = scores.gather(nms, 0).dataSync() as Int32Array; // NMS 인덱스로 점수 색인화
    const classes_data = classes.gather(nms, 0).dataSync() as Int32Array; // NMS 인덱스로 클래스 색인화

    renderBoxes(canvasRef, boxes_data, scores_data, classes_data, [xRatio, yRatio]); // 상자 렌더링
    tf.dispose([res, transRes, boxes, scores, classes, nms]); // 메모리 해제

    callback();

    tf.engine().endScope(); // 스코핑 종료
};

/**
 * 비디오에서 각 소스를 감지하는 함수입니다.
 * @param vidSource 비디오 소스
 * @param model 로드된 YOLOv8 TensorFlow.js 모델
 * @param canvasRef 캔버스 참조
 */
export const detectVideo = (vidSource: HTMLVideoElement, model: { net: tf.GraphModel | null; inputShape: number[] }, canvasRef: HTMLCanvasElement): void => {
    /**
     * 비디오에서 각 프레임을 감지하는 함수입니다.
     */
    
    const detectFrame = async (): Promise<void> => {
        if (vidSource.videoWidth === 0 && vidSource.srcObject === null) {
            const ctx = canvasRef.getContext("2d");

            if(!ctx)    return;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 캔버스 지우기
            return; // 소스가 닫혔을 때 처리
        }

        detect(vidSource, model, canvasRef, () => {
            requestAnimationFrame(detectFrame); // 다른 프레임 가져오기
        });
    };

    detectFrame(); // 모든 프레임을 감지하도록 초기화
};

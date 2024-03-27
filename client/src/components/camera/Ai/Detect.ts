import * as tf from "@tensorflow/tfjs";
import { IOHandler } from "@tensorflow/tfjs-core/dist/io/types";
import { RefObject } from "react";
import labels from "./labels.json"
import { renderBoxes } from "./RenderBox";

// 학습된 데이터 class
const numClass = labels.length

// 모델 준비..
const preprocess = (source: RefObject<HTMLVideoElement>, modelW: number, modelH: number) => {

    let xRatio, yRatio;

    // tf.tidy()
    // TensorFlow에서 메모리 누수를 방지하기 위해 '다건'의 Tensor에 대해 사용된다.
    // 객체 및 연산 객체를 메모리에서 해제하여 자원을 확보하는 역할을 한다.
    // 자동으로 추적하고 해제한다.
    const input = tf.tidy(() => {
        if (!source.current) return;
        // 이미지에서 tf.Tensor 생성
        const img = tf.browser.fromPixels(source.current);

        const [h, w] = img.shape.slice(0, 2);
        const maxSize = Math.max(w, h);
        const imgPadded = img.pad([
            [0, maxSize - h],
            [0, maxSize - w],
            [0, 0]
        ]);

        xRatio = maxSize / w;
        yRatio = maxSize / h;

        return tf.image
            .resizeBilinear(imgPadded as tf.Tensor3D, [modelW, modelH])
            .div(255.0)
            .expandDims(0);

    })

    return [input, xRatio, yRatio];

}


export const detect = async (source: RefObject<HTMLVideoElement>, model: { net: tf.GraphModel<string | IOHandler> | null; inputShape: number[]; }, canvasRef: RefObject<HTMLCanvasElement>, callback = () => { }) => {
    if (!model.net) return;

    const [modelW, modelH] = model.inputShape.slice(1, 3);

    // 모든 텐서와 백엔드를 추적하는 글로벌 엔진을 열어두는 역할을 수행
    // 텐서 메로리를 관리 시작을 알리는 메서드.
    // 항성 tf.engine().endScope()와 함께 사용해야 한다.
    tf.engine().startScope();
    const [input, xRatio, yRatio] = preprocess(source, modelW, modelH);
    if (!input || xRatio === undefined || yRatio === undefined) return;

    const res = model.net.execute(input) as tf.Tensor3D;
    const transRes = res.transpose([0, 2, 1]);
    const boxes = tf.tidy(() => {
        const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // get width
        const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // get height
        const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
        const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1

        // tf.concat은 간단히 말하면 장난감 블록을 붙이듯 자료를 합체시키는 것이다.
        // 자료들의 차원이 같아야 가능하다.
        // 또한, 붙일혀는 방향의 블록 구조가 같아야 한다.
        return tf.concat(
            [y1, x1, tf.add(y1, h), tf.add(x1, w)], 2
        ).square().reshape([-1,4]);
    })


    const [scores, classes] = tf.tidy(() => {
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze([0]);
        return [rawScores.max(1), rawScores.argMax(1)];
    });

    const nms = await tf.image.nonMaxSuppressionAsync(boxes as tf.Tensor2D, scores, 500, 0.45, 0.2); 

    const boxes_data = boxes.gather(nms, 0).dataSync() as Float32Array;
    const scores_data = scores.gather(nms, 0).dataSync() as Float32Array;
    const classes_data = classes.gather(nms, 0).dataSync() as Int32Array;

    renderBoxes({ canvasRef, boxes: boxes_data, scores: scores_data, classes: classes_data, ratios: [xRatio, yRatio] });
    tf.dispose([res, transRes, boxes, scores, classes, nms]);

    callback();

    tf.engine().endScope();
}

export const detectVideo = (vidSource: RefObject<HTMLVideoElement>, model: { net: tf.GraphModel<string | IOHandler> | null; inputShape: number[]; }, canvasRef: RefObject<HTMLCanvasElement>) => {

    const detectFrame = async () => {

        // null 값 체크
        if (!vidSource.current || vidSource.current.videoWidth === 0) {

            // canvas도 없을 수 있으므로 if문 걸어준다.
            if (!canvasRef.current)
                return;
            // canvas가 있을 때 작동한다.
            const ctx = canvasRef.current.getContext("2d");

            if (ctx)
                ctx.clearRect(0, 0, ctx. canvas.width, ctx.canvas.height);

            return;
        }

        // null값이 아니면 값을 넘긴다.
        detect(vidSource, model, canvasRef, () => {
            requestAnimationFrame(detectFrame);
        })
    }

    detectFrame();
}
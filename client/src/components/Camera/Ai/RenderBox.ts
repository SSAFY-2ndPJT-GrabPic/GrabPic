
import { Labels } from "./AiLabels";

/**
 * 예측 상자를 렌더링합니다.
 * @param canvasRef canvas 태그 참조
 * @param boxes_data 상자 배열
 * @param scores_data 점수 배열
 * @param classes_data 클래스 배열
 * @param ratios 상자 비율 [xRatio, yRatio]
 */
export const renderBoxes = (
    canvasRef: HTMLCanvasElement,
    boxes_data: Int32Array,
    scores_data: Int32Array,
    classes_data: Int32Array,
    ratios: number[]
): void => {


    const ctx = canvasRef.getContext("2d");
    if (!ctx)   return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 캔버스 초기화

    const colors = new Colors();
    // 폰트 구성
    const font = `${Math.max(
        Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40),
        14
    )}px Arial`;
    ctx.font = font;
    ctx.textBaseline = "top";

    canvasRef.addEventListener('click', (event) => {
        const rect = canvasRef.getBoundingClientRect();
        // console.log(event.clientX + " " + event.clientY);
        // console.log(rect.left + " " + rect.top);
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        // console.log(mouseX + " " + mouseY);
        // 클릭한 위치와 그려진 요소들의 위치를 비교하여 해당하는 class_data를 찾기
        for (let i = 0; i < boxes_data.length; i += 4) {
            const score = (scores_data[i / 4] * 100).toFixed(1);
            if (parseFloat(score) < 61) continue;

            const [y1, x1, y2, x2] = boxes_data.slice(i, i + 4);
            // console.log(x1 + " " + x2 + " " + y1 + " " + y2 + " " + i)
            // 사각형 안에 있는지 여부를 확인
            if (mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2) {
                const classData = classes_data[i / 4];
                // console.log('클릭한 위치의 class_data:', classData);
                localStorage.setItem('AiClassNum',classData.toString());
                break; // 해당하는 class_data를 찾았으므로 더 이상 검색하지 않음
            }
        }
    });

    for (let i = 0; i < scores_data.length; ++i) {
        // 클래스 임계값을 기반으로 필터링
        const klass = Labels[classes_data[i]];
        const color = colors.get(classes_data[i]);
        const score = (scores_data[i] * 100).toFixed(1);

        // if(parseFloat(score) < 61) continue;
        let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= ratios[0];
        x2 *= ratios[0];
        y1 *= ratios[1];
        y2 *= ratios[1];
        const width = x2 - x1;
        const height = y2 - y1;

        // 테두리 상자 그리기
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
        ctx.strokeRect(x1, y1, width, height);

        // 라벨 배경 그리기
        ctx.fillStyle = color;
        // const textWidth = ctx.measureText(klass + " - " + score + "%").width;
        const textHeight = parseInt(font, 10); // 10진수 기반
        const yText = y1 - (textHeight + ctx.lineWidth);
        // ctx.fillRect(
        //     x1 - 1,
        //     yText < 0 ? 0 : yText, // 레이블 박스 오버플로우 처리
        //     textWidth + ctx.lineWidth,
        //     textHeight + ctx.lineWidth
        // );

        // 라벨 그리기
        ctx.fillStyle = "#ffffff";
        ctx.fillText(klass + " - " + score + "%", x1 - 1, yText < 0 ? 10 : yText);

    }
};

class Colors {
    // ultralytics 색상 팔레트 https://ultralytics.com/
    palette: string[];
    n: number;

    constructor() {
        this.palette = [
            "#FF3838",
            "#FF9D97",
            "#FF701F",
            "#FFB21D",
            "#CFD231",
            "#48F90A",
            "#92CC17",
            "#3DDB86",
            "#1A9334",
            "#00D4BB",
            "#2C99A8",
            "#00C2FF",
            "#344593",
            "#6473FF",
            "#0018EC",
            "#8438FF",
            "#520085",
            "#CB38FF",
            "#FF95C8",
            "#FF37C7",
        ];
        this.n = this.palette.length;
    }

    get = (i: number): string => this.palette[Math.floor(i) % this.n];

    static hexToRgba = (hex: string, alpha: number): string => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `rgba(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(
                ", "
            )}, ${alpha})`
            : '';
    };
}

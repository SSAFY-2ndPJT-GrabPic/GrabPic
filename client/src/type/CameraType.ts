import { RefObject } from "react";

export type RenderBoxesParams = {
    canvasRef: RefObject<HTMLCanvasElement>; // canvasRef는 HTMLCanvasElement의 RefObject
    boxes_data: Float32Array; // 박스 데이터는 Float32Array 타입
    scores_data: Float32Array; // 점수 데이터는 Float32Array 타입
    classes_data: Int32Array; // 클래스 데이터는 Int32Array 타입
    ratios: [number, number]; // ratios는 숫자 튜플 타입
}

export type ElementsParams = {
    class : number;
    score : number;
    box : {x1 : number,x2 : number, y1 : number, y2 : number};
}
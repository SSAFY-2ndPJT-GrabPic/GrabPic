declare function detectVideo(vidSource: HTMLVideoElement, model: { net: tf.GraphModel, inputShape: number[] }, canvasRef: HTMLCanvasElement): void;

// 모듈 내보내기
export = detectVideo;
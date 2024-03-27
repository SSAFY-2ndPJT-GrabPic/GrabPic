import labels from './labels.json';
import { RenderBoxesParams } from '../../../type/CameraType';

export const renderBoxes = (parms : RenderBoxesParams) => {
    if(!parms.canvasRef.current)  return;
    const ctx = parms.canvasRef.current.getContext("2d");
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

}

import { Routes,Route } from "react-router-dom";

import { LivePage } from "../components/camera/LivePage";
import { CheckPage } from "../components/camera/CheckPage";

import * as C from './Camera.style'

export default function Camera() {

  return (
    <C.CameraContainer>
      <Routes>
        {/* 실시간 분석페이지 */}
        <Route index element={<LivePage/>}/>
        {/* 화면 캡처 페이지 */}
        <Route path="check" element={<CheckPage/>}/>
      </Routes>
    </C.CameraContainer>
  );
}

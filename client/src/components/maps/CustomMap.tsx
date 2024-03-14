import * as M from "./CustomMap.style"
import React, { useRef, useState } from 'react';

import { Map, useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

// zoomin 이미지 불러오기
import plusImg from "../../assets/Map/plus.png";
// zoomout 이미지 불러오기
import minusImg from "../../assets/Map/minus.png";

// 위도 경도 프롭처리할 예정.
interface MapsProps {
  lat : number;
  lng : number;
}

const CustomMap: React.FC<MapsProps> = ({ lat, lng }) => {
  // 지도 호출
  useKakaoLoaderOrigin({
    appkey: "52b3371f40d9c77376d831422bbae913",
    libraries: ["clusterer", "drawing", "services"],
  })
  // 기본 위치(현재 좌표) 호출 및 스타일 지정
  const [state] = useState({
    center: {lat: lat, lng: lng},
    style: {width: "100%", height: "100%", Position: "relative", overflow: "hidden"}
  })
  // 맵 레벨 변경을 위한 선언
  const mapRef = useRef<kakao.maps.Map>(null)

  const zoomIn = () => {
    const map = mapRef.current
    if (!map) return
    map.setLevel(map.getLevel() - 1)
  }

  const zoomOut = () => {
    const map = mapRef.current
    if (!map) return
    map.setLevel(map.getLevel() + 1)
  }

  return (
    <M.MapContainer>
      <Map // 지도를 표시할 Container
        id="map"
        center= {state.center}
        style= {state.style}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
      />
      <M.Zoom_Control>
        <M.Zoom_Span onClick={zoomIn}>
          <M.Zoom_Img
              src={plusImg}
              alt="확대"
          />
        </M.Zoom_Span>
        <M.Zoom_Span onClick={zoomOut}>
          <M.Zoom_Img
              src={minusImg}
              alt="축소"
          />
        </M.Zoom_Span>
      </M.Zoom_Control>
    </M.MapContainer>
  )
} 

export default CustomMap


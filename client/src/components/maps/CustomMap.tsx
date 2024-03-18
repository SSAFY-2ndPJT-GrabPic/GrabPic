import * as M from "./CustomMap.style"
import React, { useRef, useState, useEffect } from 'react';

import { MapMarker, Map, useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

import { useMotionValue, useMotionValueEvent } from "framer-motion"

// zoomin 이미지 불러오기
import plusImg from "../../assets/Map/plus.png";
// zoomout 이미지 불러오기
import minusImg from "../../assets/Map/minus.png";

// 위도 경도 프롭처리할 예정.
interface MapsProps {
  lat: number;
  lng: number;
}

interface ItemProps {
  name: string;
  lat: number;
  lng: number;
}

interface TestProps {
  position: MapsProps
  datas: ItemProps[];
}


const CustomMap: React.FC<TestProps> = ({ position, datas }) => {
  // 지도 호출
  useKakaoLoaderOrigin({
    appkey: "52b3371f40d9c77376d831422bbae913",
    libraries: ["clusterer", "drawing", "services"],
  })
  
  // 기본 위치(현재 좌표) 호출 및 스타일 지정
  const [state] = useState({
    center: {
      lat: position.lat,
      lng: position.lng
    },
    style: {width: "100%", height: "100%", Position: "relative", overflow: "hidden"},
  })

  // 핀리스트 
  const [isActive, setActive] = useState<boolean>(false);

  // 필터 활성화
  const [isClickActive, setClickActive] = useState<boolean[]>([true, false, false]);

  // 필터를 클릭할 때 호출되는 함수
  const filterChange = (index : number) => {
    if (index === 0) setClickActive([true, false, false])
    else if (index === 1) setClickActive([false, true, false])
    else if (index === 2) setClickActive([false, false, true])
  }
  
  // 맵 레벨 변경을 위한 선언
  const mapRef = useRef<kakao.maps.Map>(null)

  // 줌인 함수
  const zoomIn = () => {
    const map = mapRef.current
    if (!map) return
    map.setLevel(map.getLevel() - 1)
  }

  // 줌아웃 함수
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
      >
        {/* locations을 반복하여 각 위치에 마커 생성 */}
          {datas.map((location, index) => (
          <MapMarker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </Map>

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
      <M.ListContainer active={isActive}>
        <M.DragHandle onClick={() => setActive(!isActive)}/>
        <M.FilterContainer>
            <M.FilterButton clickActive={isClickActive[0]} onClick={() => filterChange(0)}>최신순</M.FilterButton>
            <M.FilterButton clickActive={isClickActive[1]} onClick={() => filterChange(1)}>오래된순</M.FilterButton>
            <M.FilterButton clickActive={isClickActive[2]} onClick={() => filterChange(2)}>희귀도순</M.FilterButton>
        </M.FilterContainer>
        {datas.map((item, index) => (
          <div key={index}>
            <div>Name: {item.name}</div>
            {/* <div>Latitude: {item.lat}</div>
            <div>Longitude: {item.lng}</div> */}
          </div>
        ))}
      </M.ListContainer>
    </M.MapContainer>
  )
} 

export default CustomMap


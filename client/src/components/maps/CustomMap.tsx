import { Map } from "react-kakao-maps-sdk"
import styled from "styled-components";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"
import React from 'react';
import {useState} from 'react';

// 위도 경도 프롭처리할 예정.
// 호출하는 게 
interface MapsProps {
  lat : number;
  lng : number;
}

const MapContainer = styled.div`
  width: 100%;
  height: calc(100% - 112px); /* 화면 높이에서 112px 제외 */
`;

const CustomMap: React.FC<MapsProps> = ({ lat, lng }) => {
  
  useKakaoLoaderOrigin({
    appkey: "52b3371f40d9c77376d831422bbae913",
    libraries: ["clusterer", "drawing", "services"],
  })

  const [state] = useState({
    center: {lat: lat, lng: lng},
    style: {width: "100%", height: "100%"}
  })

  return (
    <MapContainer>
      <Map // 지도를 표시할 Container
      id="map"
      center= {state.center}
      style={state.style}
      level={3} // 지도의 확대 레벨
    />
    </MapContainer>
  )
} 

export default CustomMap


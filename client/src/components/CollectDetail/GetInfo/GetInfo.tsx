import React from 'react';
import * as G from '../DetailInfo.style'
import { MapMarker, Map, useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

interface LatLng {
  lat: number;
  lng: number;
}

interface GetInfoProps {
  getInfo: {
    getMemo: string;
    getDate: number[];
    getLocate: LatLng;
  }
}

const GetInfo: React.FC<GetInfoProps> = ({ getInfo }) => {
  useKakaoLoaderOrigin({
    appkey: "52b3371f40d9c77376d831422bbae913",
    libraries: ["clusterer", "drawing", "services"],
  })

  const mapStyle = {
    style: {width: "100%", height: "100%", Position: "relative", overflow: "hidden"},
  }

  return (
    <G.Container>
      <G.Wrap>
        <G.Title>메모</G.Title>
        <G.Context>{getInfo.getMemo}</G.Context>
      </G.Wrap>

      <G.Wrap>
        <G.Title>수집 날짜</G.Title>
        <G.Context>{getInfo.getDate[0]}. {getInfo.getDate[1]}. {getInfo.getDate[2]}</G.Context>
      </G.Wrap>

      <G.Wrap>
        <G.Title>수집 위치</G.Title>
        <G.Context>여기는 구미 인동 다이소!</G.Context>
        <G.MapContain id='map'>
          <Map 
            id='map'
            center={getInfo.getLocate}
            style= {mapStyle.style}
            level={3} // 지도의 확대 레벨
            zoomable={false}
          >
            <MapMarker position={{ lat: getInfo.getLocate.lat, lng: getInfo.getLocate.lng }} />
          </Map>
        </G.MapContain>
      </G.Wrap>
  </G.Container>
  );
};

export default GetInfo;
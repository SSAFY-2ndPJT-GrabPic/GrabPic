import React from 'react';
import * as G from '../DetailInfo.style';
import { MapMarker, Map, useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';
import { CollectDetailType } from '../../../type/CollectType';

interface GetInfoProps {
  getInfo: CollectDetailType;
}

const GetInfo: React.FC<GetInfoProps> = ({ getInfo }) => {
  useKakaoLoaderOrigin({
    appkey: '52b3371f40d9c77376d831422bbae913',
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const mapStyle = {
    style: {
      width: '100%',
      height: '100%',
      Position: 'relative',
      overflow: 'hidden',
    },
  };

  const getLocate = {
    lat: getInfo.latitude,
    lng: getInfo.longitude,
  }

  return (
    <G.Container>
      <G.Wrap>
        <G.Title>메모</G.Title>
        <G.Context>{getInfo.memo}</G.Context>
      </G.Wrap>

      <G.Wrap>
        <G.Title>수집 날짜</G.Title>
        <G.Context>{getInfo.registDate}</G.Context>
      </G.Wrap>

      <G.Wrap>
        <G.Title>수집 위치</G.Title>
        <G.Context>{getInfo.address}</G.Context>
        <G.MapContain id="map">
          <Map
            id="map"
            center={getLocate}
            style={mapStyle.style}
            level={3} // 지도의 확대 레벨
            zoomable={false}
          >
            <MapMarker position={getLocate} />
          </Map>
        </G.MapContain>
      </G.Wrap>
    </G.Container>
  );
};

export default GetInfo;

import * as M from "./CustomMap.style"
import React, { useEffect, useRef, useState } from 'react';

import { MapMarker, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "./useKakaoLoader";

// zoomin 이미지 불러오기
import plusImg from "../../assets/Map/plus.png";
// zoomout 이미지 불러오기
import minusImg from "../../assets/Map/minus.png";
// 맵 중심 마커 이미지 불러오기
import myLocateMarker from "../../assets/Map/myLocateMarker.png";

// 위도 경도 프롭처리할 예정.
interface MapsProps {
  lat: number;
  lng: number;
}

interface ItemProps {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

const CustomMap: React.FC = () => {
  useKakaoLoader();

  // 현재 좌표 추적 위한 상태
  const [location, setLocation] = useState<MapsProps | null>(null);
  // 실제 지도 데이터 사용
  const [state, setState ] = useState({
    center: {
      lat: 36.106831,
      lng: 128.416762
    },
  })

  // 맵 레벨 변경을 위한 선언
  const mapRef = useRef<kakao.maps.Map>(null);

  // 마커 리스트
  const [randomCoordinates, setRandomCoordinates] = useState<ItemProps[]>([]);

  // 핀리스트 
  const [isActive, setActive] = useState<boolean>(false);

  // 필터 활성화
  const [isClickActive, setClickActive] = useState<boolean[]>([true, false, false]);

  // 랜덤 위도 생성
  function generateRandomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function calculateNewCoordinates(currentLat: number, currentLng: number, radius: number): { name:string, lat: number, lng: number, address: string } {
    // 0~360도 사이에서 랜덤한 각도 생성
    const randomAngle = generateRandomNumberInRange(0, 360);
    // 0~반경 사이에서 랜덤한 거리 생성
    const randomDistance = generateRandomNumberInRange(0, radius);
  
    // 새로운 위치의 위도와 경도 계산
    const lat = currentLat + (randomDistance / 111111) * Math.cos(randomAngle);
    const lng = currentLng + (randomDistance / (111111 * Math.cos(lat * Math.PI / 180))) * Math.sin(randomAngle);
    const name = 'testdata';
    const address = '';
    return { name, lat, lng, address };
  }

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    function success(position: any) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      setState({
        center:{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }

    function error() {
      console.log('error')
      setLocation({
        lat: 37.483034,
        lng: 126.902435
      })
      console.log("위치 받기 실패");
    }

    if (location === null) {
      console.log('좌표추적')
      getLocation();
    }

    if (location !== null) {
      const newCoordinates: ItemProps[] = [];
      for (let i = 0; i < 20; i++) {
        const newCoordinate = calculateNewCoordinates(location.lat, location.lng, 500);
        newCoordinates.push(newCoordinate);
      }
      setRandomCoordinates(newCoordinates);
    }

  }, [location])

  useEffect(() => {
    if (!mapRef.current || randomCoordinates.length === 0) return;
  
    console.log('주소변환');
    const addressFinder = new kakao.maps.services.Geocoder();
    
    randomCoordinates.forEach((item) => {
      addressFinder.coord2Address(item.lng, item.lat, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          item.address = address;
        }
      });
    });
  }, [randomCoordinates]);


  // 필터를 클릭할 때 호출되는 함수
  const filterChange = (index : number) => {
    if (index === 0) setClickActive([true, false, false])
    else if (index === 1) setClickActive([false, true, false])
    else if (index === 2) setClickActive([false, false, true])
  }
  
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
        style= {{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
      >
        <MapMarker key={state.center.lat-state.center.lng} position={{ lat: state.center.lat, lng: state.center.lng}} image={{src: myLocateMarker, size: { width: 29, height: 42}}}/>
        {/* locations을 반복하여 각 위치에 마커 생성 */}
          {randomCoordinates.map((location, index) => (
          <MapMarker key={index} position={{ lat: location.lat, lng: location.lng }}/>
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
        <M.PinList>
          {randomCoordinates.map((item, index) => (
            <div key={index}>
              <div>Name: {item.name}</div>
              <div>Latitude: {item.lat}</div>
              <div>Longitude: {item.lng}</div>
              <div>address: {item.address}</div>
            </div>
          ))}
        </M.PinList>
      </M.ListContainer>
    </M.MapContainer>
  )
} 



export default CustomMap


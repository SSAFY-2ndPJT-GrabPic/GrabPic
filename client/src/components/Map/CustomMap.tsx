import * as M from "./CustomMap.style"
import React, { useEffect, useRef, useState } from 'react';
import { MapMarker, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "./UseKakaoLoader";

// 이미지 모음
import plusImg from "../../assets/Map/plus.png";
import minusImg from "../../assets/Map/minus.png";
import myLocateMarker from "../../assets/Map/myLocateMarker.png";
import myPositionImg from "../../assets/Map/gps.png";
import reLoadImg from "../../assets/Map/magnifier.png";

// 위도 경도 프롭처리할 예정.
interface MapCenter {
  lat: number;
  lng: number;
}

interface MyCenter {
  lat: number;
  lng: number;
}

// 핀 데이터
interface PinData {
  encyclopedia: string;
  name: string;
  registDate: string;
  address: string;
  latitude: number;
  longitude: number;
  rareCount: 0;
}

const CustomMap: React.FC = () => {
  // useKakaoLoader();

  // 현재 좌표 추적 위한 상태
  const [ mapCenter, setMapCenter ] = useState<MapCenter | null>(null);

  const [ myCenter, setMyCenter ] = useState<MyCenter | null>(null);

  // 맵 레벨 변경을 위한 선언
  const mapRef = useRef<kakao.maps.Map>(null);

  // 마커 리스트
  const [pinLists, setpinLists] = useState<PinData[]>([]);

  // 핀리스트 
  const [isPinActive, setPinActive] = useState<boolean>(false);

  // 필터 활성화
  const [isFilterActive, setFilterActive] = useState<boolean[]>([true, false, false]);

  // 더미데이터용 함수
  /****************************************************/
  // 랜덤 위도 생성
  function generateRandomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  // 위도 경도 데이터 반환 (데이터 타입 맞추기)
  function calculateNewCoordinates(currentLat: number, currentLng: number, radius: number): PinData {
    // 0~360도 사이에서 랜덤한 각도 생성
    const randomAngle = generateRandomNumberInRange(0, 360);
    // 0~반경 사이에서 랜덤한 거리 생성
    const randomDistance = generateRandomNumberInRange(0, radius);
  
    // 새로운 위치의 위도와 경도 계산
    const encyclopedia = ''
    const latitude = currentLat + (randomDistance / 111111) * Math.cos(randomAngle);
    const longitude = currentLng + (randomDistance / (111111 * Math.cos(latitude * Math.PI / 180))) * Math.sin(randomAngle);
    const name = 'testdata';
    const address = '';
    const registDate = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1).toString().padStart(2, '0')) + '-' + new Date().getDate();
    const rareCount = 0;
    return { encyclopedia ,name ,registDate ,address ,latitude ,longitude , rareCount };
  }
  /*****************************************************/

  // 내 위치 찾기
  /****************************************************/
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function success(position: any) {
    setMapCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    setMyCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    test(position.coords.latitude, position.coords.longitude);
  }

  function error() {
    setMapCenter({
      lat: 37.483034,
      lng: 126.902435
    })
  }

  function test(lat:number, lng:number) : void {
    const newPinLists: PinData[] = [];
    for (let i = 0; i < 20; i++) {
      const newPin = calculateNewCoordinates(lat, lng, 500);
      newPinLists.push(newPin);
    }
    setpinLists(newPinLists);
  }
  
  useEffect(() => {
    if (mapCenter === null) {
      getLocation();
    }
  }, [mapCenter])

  /****************************************************/


  // 주소 변환
  useEffect(() => {
    console.log(1)
    const addressFinder = new kakao.maps.services.Geocoder();
    console.log(addressFinder)
    pinLists.forEach((pin) => {
      console.log(2)
      addressFinder.coord2Address(pin.latitude, pin.longitude, (result: any, status: any) => {
        console.log(pin.latitude, pin.longitude)
        console.log(status)
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          pin.address = address;
          console.log(address)
        }
      });
    });

  }, [pinLists]);


  // 필터를 클릭할 때 호출되는 함수
  const filterChange = (index : number) => {
    if (index === 0) setFilterActive([true, false, false])
    else if (index === 1) setFilterActive([false, true, false])
    else if (index === 2) setFilterActive([false, false, true])
  }
  
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
      {mapCenter !== null && (
        <Map // 지도를 표시할 Container
        id="map"
        center= {mapCenter}
        style= {{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
        onCenterChanged={(map) => {
          const newData = map.getCenter()
          setMapCenter({
            lat: newData.getLat(),
            lng: newData.getLng()
          })
        }}
      >
        {myCenter !== null && (
          <MapMarker key={myCenter.lat - myCenter.lng} position={myCenter} image={{src: myLocateMarker, size: { width: 29, height: 42}}}/>
        )}
        {/* locations을 반복하여 각 위치에 마커 생성 */}
          {pinLists.map((pin, index) => (
          <MapMarker key={index} position={{ lat: pin.latitude, lng: pin.longitude }}/>
        ))}
      </Map>
      )}

      <M.ZoomBtnContainer>
        <M.ZoomBtn onClick={zoomIn}>
          <M.ZoomImg
              src={plusImg}
              alt="확대"
          />
        </M.ZoomBtn>
        <M.ZoomBtn onClick={zoomOut}>
          <M.ZoomImg
              src={minusImg}
              alt="축소"
          />
        </M.ZoomBtn>
      </M.ZoomBtnContainer>

      <M.LocationBtn_Container>
        <M.LocationBtn onClick={zoomIn}>
          <M.SetCenterImg src={myPositionImg}/>
        </M.LocationBtn>
        <M.LocationBtn onClick={zoomOut}>
          <M.ReLoadImg src={reLoadImg}/>
        </M.LocationBtn>
      </M.LocationBtn_Container>


      <M.ListContainer active={isPinActive}>
        <M.HandleContainer onClick={() => setPinActive(!isPinActive)}>
          <M.DragHandle />
        </M.HandleContainer>
        <M.FilterContainer>
            <M.FilterButton clickActive={isFilterActive[0]} onClick={() => filterChange(0)}>최신순</M.FilterButton>
            <M.FilterButton clickActive={isFilterActive[1]} onClick={() => filterChange(1)}>오래된순</M.FilterButton>
            <M.FilterButton clickActive={isFilterActive[2]} onClick={() => filterChange(2)}>희귀도순</M.FilterButton>
        </M.FilterContainer>
        <M.PinList>
          {pinLists.map((pin, index) => (
             <M.PinItemContainer key={index}>
             <M.PinImgContainer src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiWR3G7uCpLQYKesAWQDjueG8KsZ-OICDBw&s" alt="" />
             <M.PinDataContainer>
               <M.PinNameSpan>{pin.name}</M.PinNameSpan>
               <M.PinInfoContainer>
                 <M.PinInfoSpan>{pin.registDate}</M.PinInfoSpan>
                 <M.PinInfoSpan>{pin.address}</M.PinInfoSpan>
               </M.PinInfoContainer>
             </M.PinDataContainer>
           </M.PinItemContainer>
          ))}
          
        </M.PinList>
      </M.ListContainer>
    </M.MapContainer>
  )
} 


export default CustomMap


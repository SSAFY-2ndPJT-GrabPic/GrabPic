import * as M from "./CustomMap.style"
import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapMarker, Map } from "react-kakao-maps-sdk";
import { MapCenter, MyCenter, PinData } from "../../types/CustomMap"
import { dataLoad } from "../../api/map";

// 이미지 모음
import plusImg from "../../assets/Map/plus.png";
import minusImg from "../../assets/Map/minus.png";
import myLocateMarker from "../../assets/Map/myLocateMarker.png";
import myPositionImg from "../../assets/Map/gps.png";
import reLoadImg from "../../assets/Map/magnifier.png";



const CustomMap: React.FC = () => {
  // 지도 생성
  const ma = new Loader({
    appkey: '52b3371f40d9c77376d831422bbae913',
    libraries: ["clusterer", "drawing", "services"],
  });
  ma.load();

  // 상태
  const [ mapCenter, setMapCenter ] = useState<MapCenter | null>(null);
  const [ myCenter, setMyCenter ] = useState<MyCenter | null>(null);
  const [pinLists, setpinLists] = useState<PinData[]>([]);
  const [isPinActive, setPinActive] = useState<boolean>(false);
  const [isFilterActive, setFilterActive] = useState<boolean[]>([true, false, false]);
  const mapRef = useRef<kakao.maps.Map>(null);


  // 내 위치 찾기
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
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
    }
  
    function error() {
      setMapCenter({
        lat: 37.483034,
        lng: 126.902435
      })
    }
  }


  // API
  const loadPinData = async (position:MapCenter, range:number, page:number, sort:number) => {
    const params = {
      latitude:  position.lat,
      longitude:  position.lng,
      range:  range,
      page : page,
      limit : 20,
      sort : sort
    }
    await dataLoad(params,
      (respones) => {
        setpinLists(respones.data)
      },
      (error) => {
        console.log(error)
      })
  }


  // 최초 로드시 현재 위치 찾기
  useEffect(() => {
    if (mapCenter === null) {
      getLocation();
    }
  }, [mapCenter])


  // 기타 함수들
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

  const centerReset = () => {
    
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


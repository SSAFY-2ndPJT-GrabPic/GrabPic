import * as M from './CustomMap.style';
import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { dataLoad } from "../../api/map";
import * as T from "../../types/CustomMap.d";

// 이미지 모음
import plusImg from '../../assets/Map/plus.png';
import minusImg from '../../assets/Map/minus.png';
import myLocateMarker from '../../assets/Map/myLocateMarker.png';
import myPositionImg from '../../assets/Map/gps.png';
import reLoadImg from '../../assets/Map/magnifier.png';
import { useNavigate } from 'react-router-dom';

const CustomMap: React.FC = () => {
  // 상태
  const [mapCenter, setMapCenter] = useState<T.MapCenter | null>(null);
  const [myCenter, setMyCenter] = useState<T.MyCenter | null>(null);
  const [pinLists, setpinLists] = useState<T.PinData[]>([]);
  const [isPinActive, setPinActive] = useState<boolean>(false);
  const [isFilterActive, setFilterActive] = useState<[number, boolean[]]>([ 1, [true, false, false] ]);
  const [isSetUp, setSetUp] = useState<boolean>(false);
  const [mapLevel, setMapLevel] = useState<number>(3);
  const [loadDist, setLoadDist] = useState<number>(0.15);
  const [loadPage, setLoadPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const mapRef = useRef<kakao.maps.Map>(null);

  // 내 위치 찾기
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMyCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    function error() {
      setMapCenter({
        lat: 37.483034,
        lng: 126.902435
      });
    }
  }

  // API
  const loadPinData = async (
    position: T.MapCenter | null,
    range: number,
    page: number,
    sort: number
  ) => {

    if (position === null) {
      return;
    }

    const params = {
      latitude: position.lat,
      longitude: position.lng,
      range: range,
      page: page,
      limit: 20,
      sort: sort,
    };

    await dataLoad(
      params,
      (respones) => {
        console.log(respones.data)
        setpinLists(respones.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // API 호출
  useEffect(() => {
    if (mapCenter !== null && !isSetUp) {
      loadPinData(mapCenter, loadDist, loadPage, isFilterActive[0]);
      setSetUp(true);
    }
  }, [mapCenter]);

  // 지도 로드
  useEffect(() => {
    const ma = new Loader({
      appkey: '52b3371f40d9c77376d831422bbae913',
      libraries: ['clusterer', 'drawing', 'services'],
    });

    ma.load().then(() => {
      getLocation();
    });
  }, []);

  // 기타 함수들
  const filterChange = (index: number) => {
    const map = mapRef.current;
    if (!map) return;

    if (index === 0) {
      setFilterActive([1, [true, false, false]]);
    } else if (index === 1) {
      setFilterActive([2, [false, true, false]]);
    } else if (index === 2) {
      setFilterActive([3, [false, false, true]]);
    }
    loadPinData(mapCenter, loadDist, loadPage, isFilterActive[0]);
  };

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  const centerReset = () => {
    getLocation();
  };

  const reLoad = () => {
    loadPinData(mapCenter, loadDist, loadPage, isFilterActive[0]);
  };

  const goDetail = (name: string, userId: number, ency: number) => {
    navigate(`/detail/${name}`, {state:{encyclopediaId: ency,userId: userId,}})
  }

  const loadPrevRef = useRef<HTMLDivElement>(null);
  const loadNextRef = useRef<HTMLDivElement>(null);

  const PrevObserver = new IntersectionObserver();
  const nextObserver = new IntersectionObserver();

  
  return (
    <M.MapContainer>
      {mapCenter !== null && (
        <Map // 지도를 표시할 Container
        id="map"
        center= {mapCenter}
        style= {{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}
        level={mapLevel} // 지도의 확대 레벨
        ref={mapRef}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          const en = `level${level}` as T.ScaleDistanceKey
          const dist = T.ScaleDistance[en]
          setMapLevel(level)
          setLoadDist(dist)
        }}
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
          {pinLists.map((pin, index) => (
            <CustomOverlayMap key={index} position={{ lat: pin.latitude, lng: pin.longitude }} clickable={true}>
              <M.PinDataContainer onClick={() => goDetail(pin.name, pin.userId, pin.encyclopedia)}>
                <M.PinImg src={pin.thumnailImage} />
              </M.PinDataContainer>
            </CustomOverlayMap>
            ))
          }
      </Map>
      )}

      <M.ZoomBtnContainer>
        <M.ZoomBtn onClick={zoomIn}>
          <M.ZoomImg src={plusImg} alt="확대" />
        </M.ZoomBtn>
        <M.ZoomBtn onClick={zoomOut}>
          <M.ZoomImg src={minusImg} alt="축소" />
        </M.ZoomBtn>
      </M.ZoomBtnContainer>

      <M.LocationBtn_Container>
        <M.LocationBtn onClick={centerReset}>
          <M.SetCenterImg src={myPositionImg} />
        </M.LocationBtn>
        <M.LocationBtn onClick={reLoad}>
          <M.ReLoadImg src={reLoadImg} />
        </M.LocationBtn>
      </M.LocationBtn_Container>

      <M.ListContainer active={isPinActive}>
        <M.HandleContainer onClick={() => setPinActive(!isPinActive)}>
          <M.DragHandle />
        </M.HandleContainer>
        <M.FilterContainer>
          <M.FilterButton
            clickActive={isFilterActive[1][0]}
            onClick={() => {
              filterChange(0);
            }}
          >
            최신순
          </M.FilterButton>
          <M.FilterButton
            clickActive={isFilterActive[1][1]}
            onClick={() => {
              filterChange(1);
            }}
          >
            오래된순
          </M.FilterButton>
          <M.FilterButton
            clickActive={isFilterActive[1][2]}
            onClick={() => {
              filterChange(2);
            }}
          >
            희귀도순
          </M.FilterButton>
        </M.FilterContainer>
        <M.PinList>
          {isLoading && <div ref={loadPrevRef} />}
          {pinLists.map((pin, index) => (
            <M.ItemContainer key={index}>
             <M.ItemImg src={pin.thumnailImage} alt="" onClick={() => goDetail(pin.name, pin.userId, pin.encyclopedia)}/>
             <M.ItemDataContainer>
               <M.ItemNameSpan onClick={() => goDetail(pin.name, pin.userId, pin.encyclopedia)}>{pin.name}</M.ItemNameSpan>
               <M.ItemInfoContainer>
                 <M.ItemInfoSpan>{pin.registDateTime}</M.ItemInfoSpan>
                 <M.ItemInfoSpan>{pin.address}</M.ItemInfoSpan>
               </M.ItemInfoContainer>
             </M.ItemDataContainer>
           </M.ItemContainer>
          ))}
          {isLoading && <div ref={loadNextRef} />}
        </M.PinList>
      </M.ListContainer>
    </M.MapContainer>
  );
};

export default CustomMap;

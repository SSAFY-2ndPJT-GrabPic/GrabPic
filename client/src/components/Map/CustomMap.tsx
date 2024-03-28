import * as M from './CustomMap.style';
import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { dataLoad } from "../../api/map";
import * as T from "../../types/CustomMap.d";
import { Oval } from 'react-loader-spinner';

// 이미지 모음
import plusImg from '../../assets/Map/plus.png';
import minusImg from '../../assets/Map/minus.png';
import myLocateMarker from '../../assets/Map/myLocateMarker.png';
import myPositionImg from '../../assets/Map/gps.png';
import reLoadImg from '../../assets/Map/magnifier.png';
import { useNavigate } from 'react-router-dom';


const CustomMap: React.FC = () => {
  // 상태
  const [mapCenter, setMapCenter ] = useState<T.MapCenter | null>(null);
  const [myCenter, setMyCenter] = useState<T.MyCenter | null>(null);
  const [pinLists, setpinLists] = useState<T.PinData[]>([]);
  const [isPinActive, setPinActive] = useState<boolean>(false);
  const [isFilterActive, setFilterActive] = useState<boolean[]>([true, false, false]);
  const [isSetUp, setSetUp] = useState<boolean>(false);
  const [mapLevel, setMapLevel] = useState<number>(3);
  const [loadDist, setLoadDist] = useState<number>(0.15);

  const navigate = useNavigate();
  const mapRef = useRef<kakao.maps.Map>(null);
  const filterRef = useRef<number>(1);
  const pageRef = useRef<number>(1);
  const NoMoreDataRef = useRef<Boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const topLoaderRef = useRef<HTMLDivElement>(null);
  const bottomLoaderRef = useRef<HTMLDivElement>(null);
  
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
        setpinLists(respones.data);
        if (pinLists.length < 20) NoMoreDataRef.current = true;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // API 호출
  useEffect(() => {
    if (mapCenter !== null && !isSetUp) {
      loadPinData(mapCenter, loadDist, pageRef.current, filterRef.current);
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

    pageRef.current = 1;
    console.log(pageRef.current, 'Page')
    if (index === 0) {
      setFilterActive([true, false, false]);
      filterRef.current = 1
    } else if (index === 1) {
      setFilterActive([false, true, false]);
      filterRef.current = 2
    } else if (index === 2) {
      setFilterActive([false, false, true]);
      filterRef.current = 3
    }

    reLoad();
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
    loadPinData(mapCenter, loadDist, pageRef.current, filterRef.current);
  };

  const goDetail = (name: string, userId: number, ency: number) => {
    navigate(`/detail/${name}`, {state:{encyclopediaId: ency,userId: userId,}})
  }

  const [refreshing, setRefreshing] = useState(false);
  const [startY] = useState(0);
  const [isLoadingTop, setIsLoadingTop] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);

  // 상세 페이지로 이동하는 함수
  useEffect(() => {
    console.log(NoMoreDataRef.current)
    console.log(pageRef.current)
    const list = listRef.current;
    const topLoader = topLoaderRef.current;
    const bottomLoader = bottomLoaderRef.current;
    let startY = 0;
    if (!list || !topLoader || !bottomLoader) return;
  
    function handleTouchStart(event : TouchEvent) {
      startY = event.touches[0].clientY;
    }
  
    function handleTouchMove(event : TouchEvent) {
      const moveY = event.touches[0].clientY;
      const pullDistance = moveY - startY;
      if (pullDistance > 400) {
        if (pageRef.current === 1) return;
        handleSwipeUp()
      }
      else if (pullDistance < -400) {
        if (NoMoreDataRef.current === true) return;
        handleSwipeDown()
      }
    }
  
    function handleTouchEnd() {
      if (refreshing) {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }
    }
  
    list.addEventListener('touchstart', handleTouchStart);
    list.addEventListener('touchmove', handleTouchMove);
    list.addEventListener('touchend', handleTouchEnd);
  
    return () => {
      list.removeEventListener('touchstart', handleTouchStart);
      list.removeEventListener('touchmove', handleTouchMove);
      list.removeEventListener('touchend', handleTouchEnd);
    };

  }, [refreshing, startY]);

    // 위로 스와이프 시 로딩 표시
  const handleSwipeUp = () => {
    if (NoMoreDataRef.current === true) NoMoreDataRef.current = false;
    setIsLoadingTop(true);
    pageRef.current -= 1;
    reLoad();
    setTimeout(() => {
      setIsLoadingTop(false);
    }, 2000);
  };

  // 아래로 스와이프 시 로딩 표시
  const handleSwipeDown = () => {
    setIsLoadingBottom(true);
    pageRef.current += 1;
    reLoad();
    setTimeout(() => {
      setIsLoadingBottom(false);
    }, 2000);
  };
  
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
            clickActive={isFilterActive[0]}
            onClick={() => {
              filterChange(0);
            }}
          >
            최신순
          </M.FilterButton>
          <M.FilterButton
            clickActive={isFilterActive[1]}
            onClick={() => {
              filterChange(1);
            }}
          >
            오래된순
          </M.FilterButton>
          <M.FilterButton
            clickActive={isFilterActive[2]}
            onClick={() => {
              filterChange(2);
            }}
          >
            희귀도순
          </M.FilterButton>
        </M.FilterContainer>

        <M.PinList ref={listRef}>
          <M.Loader ref={topLoaderRef} className={`loader ${isLoadingTop ? '' : 'hidden'}`}> 
            <Oval
              ariaLabel='loading-indicator'
              height={20}
              width={20}
              strokeWidth={3}
              strokeWidthSecondary={3}
              color='#50940C'
              secondaryColor='#50940c75'
            />
          </M.Loader>
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
          <M.Loader ref={bottomLoaderRef} className={`loader ${isLoadingBottom ? '' : 'hidden'}`}> 
            <Oval
              ariaLabel='loading-indicator'
              height={20}
              width={20}
              strokeWidth={3}
              strokeWidthSecondary={3}
              color='#50940C'
              secondaryColor='#50940c75'
            />
          </M.Loader>
        </M.PinList>

      </M.ListContainer>
    </M.MapContainer>
  );
};

export default CustomMap;

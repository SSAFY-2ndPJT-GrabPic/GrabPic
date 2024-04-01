import * as M from './CustomMap.style';
import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { dataLoad } from "../../api/map";
import * as T from "../../types/CustomMap.d";
import loadingGif from '../../assets/Gallery/loadingGif.gif'
import * as G from '../../pages/Gallery.style'


// 이미지 모음
import plusImg from '../../assets/Map/plus.png';
import minusImg from '../../assets/Map/minus.png';
import myLocateMarker from '../../assets/Map/myLocateMarker.png';
import myPositionImg from '../../assets/Map/gps.png';
import reLoadImg from '../../assets/Map/magnifier.png';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { backState } from '../../recoil/atoms/DetailBackState';



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
  const [moreData, setMoreData] = useState<boolean>(true);
  const [isPrevRefreshing, setIsPrevRefreshing] = useState(false);
  const [isNextRefreshing, setIsNextRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);


  const navigate = useNavigate();
  const mapRef = useRef<kakao.maps.Map>(null);
  const filterRef = useRef<number>(1);
  const pageRef = useRef<number>(1);
  const listRef = useRef<HTMLDivElement>(null);
  
  
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
        console.log(pageRef.current)
        if (respones.data.length < 20) setMoreData(false);
        setpinLists(respones.data);
        console.log(respones.data)
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

  const setBackWhereState = useSetRecoilState(backState);
  
  const goDetail = (name: string, userId: number, ency: number) => {
    navigate(`/detail/${name}`, {state:{encyclopediaId: ency,userId: userId,}})
    setBackWhereState('map')
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setCurrentY(e.touches[0].clientY);
      if (currentY - startY > 300) {
        setIsDragging(true);
      }
      if (currentY - startY < -300) {
        setIsDragging(true);
      }
    };

    const handleTouchEnd = () => {
      console.log(startY, currentY)
      if (isDragging && currentY - startY > 200 && startY > 400 && pageRef.current > 1) {
        setIsPrevRefreshing(true);
      }

      if (isDragging && currentY - startY < -200 && startY > 650 && moreData) {
        setIsNextRefreshing(true);
      }
      setIsDragging(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentY, isDragging, startY]);

  useEffect(() => {
    if (!isPrevRefreshing) {
      setStartY(0);
      setCurrentY(0);
    } else {
      console.log(isPrevRefreshing)
      setTimeout(()=>{
        setIsPrevRefreshing(false)
        if (isPinActive && pageRef.current > 1) {
          setMoreData(true)
          pageRef.current -= 1;
          reLoad();
        }
      }, 1000)
    }

  }, [isPrevRefreshing]);

  useEffect(() => {
    if (!isNextRefreshing) {
      setStartY(0);
      setCurrentY(0);
    } else {
      console.log(isNextRefreshing)
      setTimeout(()=>{
        setIsNextRefreshing(false)
        if (isPinActive && moreData) {
          console.log('동작')
          pageRef.current += 1;
          reLoad();
        }
      }, 1000)
    }

  }, [isNextRefreshing]);


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

          if (mapLevel < level) {
            setMoreData(true);
            pageRef.current = 1;
          }
          
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
                <M.PinImg src={pin.thumbnailImage} />
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
          {isPrevRefreshing && <G.LoadingGif src={loadingGif}/>}
          {pinLists.map((pin, index) => (
            <M.ItemContainer key={index} onClick={() => goDetail(pin.name, pin.userId, pin.encyclopedia)}>
              <M.ItemImg src={pin.thumnailImage} alt=""/>
              <M.ItemDataContainer>
                <M.ItemNameSpan>{pin.name}</M.ItemNameSpan>
                <M.ItemInfoContainer>
                  <M.ItemInfoSpan>{pin.registDateTime}</M.ItemInfoSpan>
                  <M.ItemInfoSpan>{pin.address}</M.ItemInfoSpan>
                </M.ItemInfoContainer>
              </M.ItemDataContainer>
            </M.ItemContainer>
          ))}
          {isNextRefreshing && <G.LoadingGif src={loadingGif}/>}
        </M.PinList>

      </M.ListContainer>
    </M.MapContainer>
  );
};

export default CustomMap;

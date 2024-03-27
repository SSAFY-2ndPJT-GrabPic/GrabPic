import * as M from './CustomMap.style';
import React, { useEffect, useRef, useState } from 'react';
import { Loader, MapMarker, Map } from 'react-kakao-maps-sdk';
import { dataLoad } from '../../api/map';
import * as T from '../../types/CustomMap.d';

// 이미지 모음
import plusImg from '../../assets/Map/plus.png';
import minusImg from '../../assets/Map/minus.png';
import myLocateMarker from '../../assets/Map/myLocateMarker.png';
import myPositionImg from '../../assets/Map/gps.png';
import reLoadImg from '../../assets/Map/magnifier.png';

const CustomMap: React.FC = () => {
  // 상태
  const [mapCenter, setMapCenter] = useState<T.MapCenter | null>(null);
  const [myCenter, setMyCenter] = useState<T.MyCenter | null>(null);
  const [pinLists, setpinLists] = useState<T.PinData[]>([]);
  const [isPinActive, setPinActive] = useState<boolean>(false);
  const [isFilterActive, setFilterActive] = useState<[number, boolean[]]>([
    1,
    [true, false, false],
  ]);
  const [isSetUp, setSetUp] = useState<boolean>(false);
  const [mapLevel, setMapLevel] = useState<number>(3);
  const [loadDist, setLoadDist] = useState<number>(0.15);
  const [loadPage] = useState<number>(1);
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
        lng: 126.902435,
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

  return (
    <M.MapContainer>
      {mapCenter !== null && (
        <Map // 지도를 표시할 Container
          id="map"
          center={mapCenter}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
          level={mapLevel} // 지도의 확대 레벨
          ref={mapRef}
          onZoomChanged={(map) => {
            const level = map.getLevel();
            const en = `level${level}` as T.ScaleDistanceKey;
            const dist = T.ScaleDistance[en];
            setMapLevel(level);
            setLoadDist(dist);
          }}
          onCenterChanged={(map) => {
            const newData = map.getCenter();
            setMapCenter({
              lat: newData.getLat(),
              lng: newData.getLng(),
            });
          }}
        >
          {myCenter !== null && (
            <MapMarker
              key={myCenter.lat - myCenter.lng}
              position={myCenter}
              image={{ src: myLocateMarker, size: { width: 29, height: 42 } }}
            />
          )}
          {/* locations을 반복하여 각 위치에 마커 생성 */}
          {pinLists.map((pin, index) => (
            <MapMarker
              key={index}
              position={{ lat: pin.latitude, lng: pin.longitude }}
            />
          ))}
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
          {pinLists.map((pin, index) => (
            <M.PinItemContainer key={index}>
              <M.PinImgContainer
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiiWR3G7uCpLQYKesAWQDjueG8KsZ-OICDBw&s"
                alt=""
              />
              <M.PinDataContainer>
                <M.PinNameSpan>{pin.name}</M.PinNameSpan>
                <M.PinInfoContainer>
                  <M.PinInfoSpan>{pin.registDateTime}</M.PinInfoSpan>
                  <M.PinInfoSpan>{pin.address}</M.PinInfoSpan>
                </M.PinInfoContainer>
              </M.PinDataContainer>
            </M.PinItemContainer>
          ))}
        </M.PinList>
      </M.ListContainer>
    </M.MapContainer>
  );
};

export default CustomMap;

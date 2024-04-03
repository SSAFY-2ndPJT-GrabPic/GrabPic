import React, { useEffect, useState } from 'react';
import * as C from './Collection.style';
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { catecoryState, filterDoneState, filterState } from '../../../recoil/atoms/CollectFilterState';
import Filter from './Filter';
import { getFilterList } from '../../../api/encyclopedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { CollectItem, chartParamType } from '../../../type/CollectType';
import { backState } from '../../../recoil/atoms/DetailBackState';
import loadingGif from '../../../assets/Gallery/loadingGif.gif'

interface CollectionProps {
  userId: number;
}

const Collection: React.FC<CollectionProps> = ({ userId }) => {
  const [isOpen, setIsOpenState] = useRecoilState(filterState);
  const [isFilterDone, setIsFilterDone] = useRecoilState(filterDoneState)
  const [categoryInfo, setCategoryInfo] = useRecoilState<chartParamType>(catecoryState)

  const location = useLocation();
  const userIdData = location.state ? location.state.userId : userId

  const [collectList, setCollectList] = useState<CollectItem[]>([]);
  const navigate = useNavigate();
  const setBackState = useSetRecoilState(backState);

  const [param, setParam] = useState<chartParamType>({})

  useEffect(() => {
    setParam(location.state ? location.state.param : {})
  }, [location.state]);

  useEffect(() => {
    if (isFilterDone) {
      console.log('필터완료')
      setPage(0)
      setParam(categoryInfo)
      setIsLoading(true)
    }
  }, [isFilterDone]);

  const navigateHandler = (name: string, encyId: number) => {
    navigate(`/detail/${name}`, {state:{
      encyclopediaId: encyId,
      userId: userId,
    }})
    setBackState('collect')
  }

  // 무한스크롤
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // observer 컴포넌트 만나면 발생하는 콜백 함수 -> loading중 표시
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading) {
      setIsLoading(true)
    }
  };

  // threshold : 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행
  const observer = new IntersectionObserver(handleObserver, { threshold: 0 });

  useEffect(() => {
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }

    return () => {
      setParam({})
      setCategoryInfo({})
      setIsFilterDone(false)
    }
  }, [])

  // 로딩중이면 페이지 상승 + api 요청
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setPage((page) => page + 1);
        fetchDataHandler();
      }, 100)
    }
  }, [isLoading])

  // 데이터 추가 및 loading상태 변경
  const fetchDataHandler = async () => {
    await getFilterList(
      param,
      page,
      userIdData,
      (res) => { 
        if (isFilterDone) {
          setCollectList(res.data)
          setIsFilterDone(false)
          setCategoryInfo({})
        } else {
          setCollectList(prevList => prevList.concat(res.data)) 
        }
      },
      (err) => { console.error(err) }
    )
    setIsLoading(false)
  }

  const getAllData = () => {
    setPage(0)
    getFilterList(
      {},
      0,
      userIdData,
      (res) => { 
        setCollectList(res.data)
      },
      (err) => { console.error(err) }
    )
    setParam({})
    setCategoryInfo({})
    setIsFilterDone(false)
  }

  return (
    <>
      {isOpen && <Filter userId={userIdData} />}
      <C.Container>
        <C.BtnAlign>
          <C.FilterBtn onClick={() => setIsOpenState(true)}>
            <C.FilterImg src={filterBtnImg} />
            <C.FilterTxt>필터</C.FilterTxt>
          </C.FilterBtn>
          <C.TotalBtn onClick={() => getAllData()}>전체 보기</C.TotalBtn>
        </C.BtnAlign>

        <C.CollectContainer className="grid gird-cols-3">
          {collectList.map((collectItem, index) => (
            <C.CollectItem 
              key={index} 
              onClick={() => navigateHandler(collectItem.name, collectItem.encyclopediaId)}
            >
              <C.ItemImg src={collectItem.thumbnailImageUrl} />
              <C.ItemName>{collectItem.name}</C.ItemName>
            </C.CollectItem>
          ))}

          <C.ObserverContainer id="observer">
            {isLoading && <C.LoadingGif src={loadingGif} />}
          </C.ObserverContainer>
        </C.CollectContainer>
      </C.Container>
    </>
  );
};

export default Collection;

import { useEffect, useState } from "react";
import GalleryItem from "../components/Gallery/GalleryItem";
import { GalleryItemType } from "../type/GalleryType";
import { getGalleryList } from "../api/gallery";
import loadingGif from '../assets/Gallery/loadingGif.gif'
import * as G from './Gallery.style'

interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  const [page, setPage] = useState<number>(1)
  const [galleryList, setGalleryList] = useState<GalleryItemType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // observer 컴포넌트 만나면 발생하는 콜백 함수 -> loading중 표시
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading && !isStop) {
      setIsLoading(true)
    }
  };
  
  // threshold : Intersection Observer의 옵션, 0 ~ 1 (0: 일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행)
  const observer = new IntersectionObserver(handleObserver, { threshold: 0 });

  useEffect(() => {
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [])

  const [isStop, setIsStop] = useState<boolean>(false)

  // 로딩중이면 페이지 상승 + api 요청
  // useEffect가 isLoading의 상태 변화를 계속 추적하며 api 쏘므로
  // setTimeout을 통해 api 요청 한번만 갈 수 있도록 수정
  useEffect(() => {
    if (isStop) {
      setIsLoading(false)
      return
    }
    if (isLoading) {
      setTimeout(() => {
        setPage((page) => page + 1);
        fetchDataHandler();
      }, 100)
    }
  }, [isLoading])

  // galleryList에 데이터 추가 및 loading상태 변경
  const fetchDataHandler = async () => {
    await getGalleryList(
      page,
      (res) => {
        setGalleryList(prevList => prevList.concat(res.data))
        console.log(res)
        if (res.data.length < 21) {
          setPage(0)
          setIsStop(true)
        }
      },
      (err) => { console.error(err) }
    )
    setIsLoading(false)
  }
  

  return (
    <div>
      {galleryList.map((galleryItem, idx) => (
        <GalleryItem key={idx} galleryItem={galleryItem} />
      ))}
      
      <G.ObserverContainer id="observer">
        {isLoading && <G.LoadingGif src={loadingGif} />}
      </G.ObserverContainer>
    </div>
  );
};

export default Gallery;
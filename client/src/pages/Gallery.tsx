import { useEffect, useState } from "react";
import GalleryItem from "../components/Gallery/GalleryItem";
import { GalleryItemType } from "../type/GalleryType";
import { getGalleryList } from "../api/encyclopedia";
import loadingGif from '../assets/Gallery/loadingGif.gif'
import * as G from './Gallery.style'

interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  const [page, setPage] = useState<number>(1)
  const [galleryList, setGalleryList] = useState<GalleryItemType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prePage) => prePage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });

    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchDataHandler();
  }, [page])

  const fetchDataHandler = async () => {
    
    getGalleryList(
      page,
      (res) => {
        const newList: GalleryItemType = res.data
        if (newList) {
          setGalleryList(prevList => prevList.concat(newList))
          setIsLoading(false)
        }
        console.log(galleryList)
      },
      (err) => {
        console.error(err)
      }
    )
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
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

    if (target.isIntersecting && !isLoading) {
      setPage((prePage) => prePage + 1);
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });

    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [])


  useEffect(() => {
    setIsLoading(true)
    // if (isLoading) {
      setTimeout(() => {
        if (isLoading) {
          fetchDataHandler();
        }
      }, 1000)
    // }
    // return setPage(1)
  }, [page])

  const fetchDataHandler = async () => {
    await getGalleryList(
      page,
      (res) => {
        console.log(res)
        
        setGalleryList(prevList => prevList.concat(res.data))
        setIsLoading(false)
        
        console.log(page, galleryList)
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
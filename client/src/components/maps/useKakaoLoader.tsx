import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "52b3371f40d9c77376d831422bbae913",
    libraries: ["clusterer", "drawing", "services"],
  })
}
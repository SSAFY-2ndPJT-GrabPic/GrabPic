import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"

export default function BasicMap() {
  useKakaoLoader()
  
  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 36.10710,
        lng: 128.4162,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "900px",
      }}
      level={3} // 지도의 확대 레벨
    />
  )
}

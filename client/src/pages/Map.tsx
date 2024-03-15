import CustomMap from '../components/maps/CustomMap'
import { useState, useEffect } from 'react';

const Map: React.FC = () => {
  // 랜덤 위도 생성
  function generateRandomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function calculateNewCoordinates(currentLat: number, currentLng: number, radius: number): { lat: number, lng: number } {
    // 0~360도 사이에서 랜덤한 각도 생성
    const randomAngle = generateRandomNumberInRange(0, 360);
    // 0~반경 사이에서 랜덤한 거리 생성
    const randomDistance = generateRandomNumberInRange(0, radius);
  
    // 새로운 위치의 위도와 경도 계산
    const lat = currentLat + (randomDistance / 111111) * Math.cos(randomAngle);
    const lng = currentLng + (randomDistance / (111111 * Math.cos(lat * Math.PI / 180))) * Math.sin(randomAngle);
  
    return { lat, lng };
  }
  

  const randomCoordinates: { lat: number, lng: number }[] = [];
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    function success(position: any) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }

    function error() {
      setLocation({
        lat: 37.483034,
        lng: 126.902435
      })
      console.log("위치 받기 실패");
    }
    if (location === null) {
      getLocation();
    }
    if (location !== null) {
      for (let i = 0; i < 20; i++) {
        const newCoordinates = calculateNewCoordinates(location?.lat, location?.lng, 200);
        randomCoordinates.push(newCoordinates);
      }
    }

  }, [location])

  return (
    <>
      {location !== null && randomCoordinates !== null && (
        <CustomMap position={location} locations={randomCoordinates} />
      )}
    </>
  )
}

export default Map
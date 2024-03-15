import CustomMap from '../components/maps/CustomMap'
import { useState, useEffect } from 'react';

const Map: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }

    function success(position: any) {
      console.log('위치 찾음')
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
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
  }, [location])

  return (
    <>
      {location !== null && (
        <CustomMap lat={location.lat} lng={location.lng} />
      )}
    </>
  )
}

export default Map
import { useEffect, useRef } from 'react';
import { WebCam } from './WebCam';

import * as L from './LivePage.style';
import { useNavigate } from 'react-router-dom';

import CloseIconUrl from '../../assets/icon/closeX.png';

export const LivePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const navigate = useNavigate();

  // webCam을 가져와서 오픈한다.
  useEffect(() => {
    const webCam = new WebCam();
    const currentVideoRef = videoRef.current;
    webCam.open(currentVideoRef);

    // webCam 닫는다.
    return () => {
      webCam.close(currentVideoRef);
    };
  }, []);

  // 캡쳐 함수
  const capture = () => {
    // 비디오 값이 있다면.
    if (videoRef.current) {

      // canvas 생성.
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');

      // canvas를 생성하였다면
      if (context) {

        // 그린다.
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');

        // 바로 페이지를 넘기면서 이미지를 넘긴다.
        navigate(`/camera/check?image=${encodeURIComponent(dataURL)}`);
      }
    }
  };

  // 닫기 버튼 이전 페이지로 돌아간다.
  const closeBtnClick = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={capture}>test</button>
      <L.CameraExitBtn onClick={closeBtnClick}>
        <img src={CloseIconUrl} />
      </L.CameraExitBtn>
      <L.LiveVideo autoPlay muted ref={videoRef} />
    </>
  );
};

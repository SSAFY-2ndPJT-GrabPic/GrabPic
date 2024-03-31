import { useEffect, useRef, useState } from 'react';
import { WebCam } from './WebCam';

import * as tf from '@tensorflow/tfjs';

import * as L from './LivePage.style';
import { useNavigate } from 'react-router-dom';

import CloseIconUrl from '../../assets/icon/closeX2.png';

import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '../../recoil/atoms/SettingState';
import { detectVideo } from './Ai/Detect';

export const LivePage: React.FC = () => {
  const navigate = useNavigate();

  let interval: string | number | NodeJS.Timeout | undefined;

  // 로딩
  const setLoading = useSetRecoilState(isLoadingState);

  // 모델이 로드되었음을 나타내는 상태 추가
  const [modelLoaded, setModelLoaded] = useState(false);
  // 모델
  const [model, setModel] = useState<{
    net: tf.GraphModel | null;
    inputShape: number[];
  }>({
    net: null,
    inputShape: [1, 0, 0, 3],
  });

  // 이미지 자동 저장.
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const capturedLen = useRef(0);

  // 비디오
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // 객체 틀 박스
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // webCam을 가져와서 오픈한다.
  useEffect(() => {
    setLoading({ loading: true, progress: 0 });
    // webCam
    const webCam = new WebCam();
    const currentVideoRef = videoRef.current;
    webCam.open(currentVideoRef);

    // AI 모델 불러오기
    tf.ready().then(async () => {
      const yolo = await tf.loadGraphModel(`animal_web_model/model.json`, {
        onProgress: (val) => {
          setLoading({ loading: true, progress: val });
        },
      });

      const dummyInput = tf.ones(yolo.inputs[0].shape as number[]);
      const warmupResults = yolo.execute(dummyInput);

      setTimeout(() => {
        setLoading({ loading: false, progress: 1 });
      }, 1500);

      setModel({
        net: yolo,
        inputShape: yolo.inputs[0].shape as number[],
      });

      tf.dispose([warmupResults, dummyInput]);

      setModelLoaded(true);
    });

    // 0.1초 간격 저장.
    autoSave();

    // webCam 닫는다.
    return () => {
      clearInterval(interval);
      webCam.close(currentVideoRef);

      // 메모리 해제
      if(model.net)
        model.net.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modelLoaded) {
      detectVideo(videoRef.current!, model, canvasRef.current!);
    }
  }, [model, modelLoaded]);

  const autoSave = () => {
    interval = setInterval(() => {
      if (videoRef.current) {
        // canvas 생성.
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');

        // canvas를 생성하였다면
        if (context) {
          // 그린다.
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const dataURL = canvas.toDataURL('image/jpeg');

          if (capturedLen.current >= 20) {
            setCapturedImages((prevImages) => [
              ...prevImages.slice(1),
              dataURL,
            ]);
          } else {
            setCapturedImages((prevImages) => [...prevImages, dataURL]);
            capturedLen.current++;
          }
        }
      }
    }, 100);
  };

  // 캡쳐 함수
  const capture = () => {
    const AiClassNum = localStorage.getItem('biologyId');
    if (!AiClassNum) return;
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

        clearInterval(interval);

        const dataURL = canvas.toDataURL('image/png');
        const {geolocation} = navigator;

        // 현재 위치
        geolocation.getCurrentPosition((params) => { 
          const location = {latitude : params.coords.latitude, longitude : params.coords.longitude};
          localStorage.setItem('location', JSON.stringify(location))
        });

        if(model.net)
        model.net.dispose();

        // 바로 페이지를 넘기면서 이미지를 넘긴다.
        // navigate(`/camera/check?image=${encodeURIComponent(dataURL)}`);
        navigate(`/camera/check`, {
          state: { image: dataURL, autoSave: capturedImages },
        });
      }
    }
  };

  // 닫기 버튼 이전 페이지로 돌아간다.
  const closeBtnClick = () => {
    if(model.net)
      model.net.dispose();

    navigate('/home')

  };

  return (
    <>
      <L.CameraExitBtn onClick={closeBtnClick}>
        <img src={CloseIconUrl} />
      </L.CameraExitBtn>
      <L.LiveVideo
        autoPlay
        muted
        ref={videoRef}
        onPlay={() => {
          detectVideo(videoRef.current!, model, canvasRef.current!);
        }}
      />
      <L.CameraCanvas
        width={model.inputShape[1]}
        height={model.inputShape[2]}
        ref={canvasRef}
        onClick={capture}
      />
    </>
  );
};

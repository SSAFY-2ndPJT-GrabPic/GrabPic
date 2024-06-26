import { useEffect, useRef, useState } from 'react';
import { WebCam } from './WebCam';

import * as tf from '@tensorflow/tfjs';

import * as L from './LivePage.style';
import { useNavigate } from 'react-router-dom';

import CloseIconUrl from '../../assets/icon/closeX2.png';

import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '../../recoil/atoms/SettingState';
import { detectVideo } from './Ai/Detect';

import plusUrl from '../../assets/Map/plus.png'
import minusUrl from '../../assets/Map/minus.png'

export const LivePage: React.FC = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState<number>(1);
  let interval: string | number | NodeJS.Timeout | undefined;
  let interval2: string | number | NodeJS.Timeout | undefined;

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

  const webCam = new WebCam();
  useEffect(() => {
    const currentVideoRef = videoRef.current;

    const videoWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const videoHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    webCam.open(currentVideoRef, videoWidth, videoHeight, zoom);

    // autoSave();
      test();
    return () => {
      clearInterval(interval2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[zoom])

  // webCam을 가져와서 오픈한다.
  useEffect(() => {
    
    // 모델 불러오기
    if (!model.net) loadModel();

    // 0.1초 간격 저장.
    autoSave();

    // webCam 닫는다.
    return () => {
      clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      webCam.close(videoRef.current);

      // 메모리 해제
      if (model.net) model.net.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 모델을 불러오면 값이 변해 함수를 재 호출해준다.
  useEffect(() => {
    if (modelLoaded) {
      // detectVideo(videoRef.current!, model, canvasRef.current!);
      test();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, modelLoaded]);

  const loadModel = () => {
    setLoading({ loading: true, progress: 0 });
    tf.setBackend('webgl');
    // AI 모델 불러오기
    tf.ready().then(async () => {
      const yolo = await tf.loadGraphModel(
        `final_animal_web_model/model.json`,
        {
          onProgress: (val) => {
            setLoading({ loading: true, progress: val });
          },
        }
      );

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
  };

  const test = () => {
    interval2 = setInterval(async () => {
      if (videoRef.current && videoRef.current.videoWidth > 0) {
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

          if(modelLoaded){
            const imgData = context.getImageData(0,0,canvas.width,canvas.height);
            await detectVideo(imgData, model, canvasRef.current!);
          }

          
        }
      }
    }, 300);
  }

  const autoSave = () => {
    interval = setInterval(async () => {
      if (videoRef.current && videoRef.current.videoWidth > 0) {
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
        const { geolocation } = navigator;

        // 현재 위치
        geolocation.getCurrentPosition((params) => {
          const location = {
            latitude: params.coords.latitude,
            longitude: params.coords.longitude,
          };
          localStorage.setItem('location', JSON.stringify(location));
        });

        if (model.net) model.net.dispose();

        // 바로 페이지를 넘기면서 이미지를 넘긴다.
        navigate(`/camera/check`, {
          state: { image: dataURL, autoSave: capturedImages },
        });
      }
    }
  };

  // 닫기 버튼 이전 페이지로 돌아간다.
  const closeBtnClick = () => {
    if (model.net) model.net.dispose();

    navigate('/');
  };

  const plusClick = () => {
    if(zoom < 5){
      setZoom(zoom + 1);
    }
  }

  const minusClick = () => {
    if(zoom > 1){
      setZoom(zoom - 1);
    }
  }

  return (
    <>
      <L.ZoomBtnContainer>
        <L.ZoomBtn onClick={plusClick}>
          <L.ZoomImg src={plusUrl} alt="확대" />
        </L.ZoomBtn>
        <L.ZoomBtn onClick={minusClick}>
          <L.ZoomImg src={minusUrl} alt="축소" />
        </L.ZoomBtn>
      </L.ZoomBtnContainer>

      <L.CameraExitBtn onClick={closeBtnClick}>
        <img src={CloseIconUrl} />
      </L.CameraExitBtn>
      <L.LiveVideo
        autoPlay
        muted
        ref={videoRef}
        // onPlay={() => {
        //   detectVideo(videoRef.current!, model, canvasRef.current!);
        // }}
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

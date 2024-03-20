import googleIconUrl from '../../assets/Login/google.png';
import naverIconUrl from '../../assets/Login/naver.png';
import kakaoIconUrl from '../../assets/Login/kakao.png';

import * as L from './Login.style';
import { useEffect } from 'react';


export const SocailLogin: React.FC = () => {
  // const kakaoKey = import.meta.env.VITE_KAKAO_SDK_KEY;

  useEffect(() => {
  })

  return (
    <>
      <L.AnothLogin>
        <img src={googleIconUrl} className="mr-3" />
        구글 로그인
      </L.AnothLogin>
      <L.AnothLogin>
        <img src={naverIconUrl} className="mr-3" />
        네이버 로그인
      </L.AnothLogin>
      <L.AnothLogin>
        <img src={kakaoIconUrl} className="mr-3" />
        카카오 로그인
      </L.AnothLogin>
    </>
  );
};

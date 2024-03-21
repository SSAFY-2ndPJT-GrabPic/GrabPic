import googleIconUrl from '../../assets/Login/google.png';
import naverIconUrl from '../../assets/Login/naver.png';
import kakaoIconUrl from '../../assets/Login/kakao.png';

import * as L from './Login.style';


export const SocailLogin: React.FC = () => {

  const url = 'https://j10d104.p.ssafy.io/api';

  const loginClick = (e : number) => {
    if(e === 1) 
      window.location.href = url + '/login/oauth2/authorization/google';
    else if(e === 2)
      window.location.href = url + '/login/oauth2/authorization/naver';
    else
      window.location.href = url + '/login/oauth2/authorization/kakao';
  }

  return (
    <>
      <L.AnothLogin onClick={() => {loginClick(1)}}>
        <img src={googleIconUrl} className="mr-3" />
        구글 로그인
      </L.AnothLogin>
      <L.AnothLogin onClick={() => {loginClick(2)}}>
        <img src={naverIconUrl} className="mr-3" />
        네이버 로그인
      </L.AnothLogin>
      <L.AnothLogin onClick={() => {loginClick(3)}}>
        <img src={kakaoIconUrl} className="mr-3" />
        카카오 로그인
      </L.AnothLogin>
    </>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../recoil/atoms/UserState'
import * as L from './Login.style';
import * as G from '../styles/globalCSS';

import googleIconUrl from '../assets/Login/google.png'
import naverIconUrl from '../assets/Login/naver.png'
import kakaoIconUrl from '../assets/Login/kakao.png'

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [isLogin,setIsLogin] = useRecoilState<boolean>(isLoginState)
  // const [loginData, setLoginData] = useState<{email:string;password:string}>({ email: "", password: "" });


  const move = (path:string) => {
    if(path === 'pwSet'){
      navigate("/resetpw", { state : {page : 'resetpw'} });
    }else if(path === 'join'){
      navigate("/join", { state : {page : 'join'} });
    }
  }
  
  const loginCheck = () =>{
    console.log(isLogin);
    setIsLogin(true);
    navigate("/");
  }

  return (
    <div className="flex flex-col px-6 overflow-scroll">
      <L.LoginText>로그인</L.LoginText>
      <G.InputContainer>
        <span>이메일</span>
        <G.InputBox></G.InputBox>
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputContainer>
        <span>비밀번호</span>
        <G.InputBox></G.InputBox>
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputButtonActive onClick={loginCheck}>로그인</G.InputButtonActive>
      <div className="flex flex-row items-center self-end mt-3">
        <L.AnotherBtn className="mr-5" onClick={() => move('pwSet')}>비밀번호 재설정</L.AnotherBtn>
        <L.AnotherBtn onClick={() => move('join')}>회원가입</L.AnotherBtn>
      </div>
      <div className="flex flex-row mt-10 items-center mb-3">
        <L.LoginLine></L.LoginLine>
        <L.LoginLineText>또는</L.LoginLineText>
        <L.LoginLine></L.LoginLine>
      </div>
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
    </div>
  );
};

export default Login;

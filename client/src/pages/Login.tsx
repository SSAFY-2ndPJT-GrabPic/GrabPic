import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../recoil/atoms/UserState'

import { userLogin } from '../api/user';

import * as L from './Login.style';
import * as G from '../styles/globalCSS';

import googleIconUrl from '../assets/Login/google.png'
import naverIconUrl from '../assets/Login/naver.png'
import kakaoIconUrl from '../assets/Login/kakao.png'

const Login: React.FC = () => {
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState<boolean>(isLoginState)
  
  const emailReg =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const move = (path:string) => {
    if(path === 'pwSet'){
      navigate("/resetpw", { state : {page : 'resetpw'} });
    }else if(path === 'join'){
      navigate("/join", { state : {page : 'join'} });
    }
  }

  const emailCheck = (s : string) => {
    setEmail(s)
    if(emailReg.test(s)){
      setIsEmail(true);
      setEmailMsg('')
    }else{
      setIsEmail(false);
      setEmailMsg('이메일의 형식이 올바르지 않습니다!')
    }
  }
  
  const pwCheck = (s: string) => {
    setPw(s);
    if(s.length >= 8){
      setIsPw(true);
      setPwMsg('');
    }else{
      setIsPw(false);
      setPwMsg('비밀번호 8글자 이상 입력하시오.')
    }
  }

  const loginCheck =  async () =>{
    if(!isEmail){
      setEmailMsg('이메일을 입력하시오');
    }
    else if(!isPw){
      setPwMsg('비밀번호를 입력하시오');
    }
    else{
      const params = {email : email, password : pw};
      await userLogin(
        params,
        (response) => {
          if(response.status === 200){
            localStorage.setItem("accessToken",response.headers.access)
            setIsLogin(true);
            navigate("/");
          }
        },
        (error) => {console.log(error)}
      );

    }
  }

  return (
    <div className="flex flex-col px-6">
      <L.LoginText>로그인</L.LoginText>
      <G.InputContainer>
        <span>이메일</span>
        <G.InputBox onChange={(e) => emailCheck(e.target.value)}></G.InputBox>
        <G.InputError>{emailMsg}</G.InputError>
      </G.InputContainer>
      <G.InputContainer>
        <span>비밀번호</span>
        <G.InputBox type='password' onChange={(e) => pwCheck(e.target.value)}></G.InputBox>
        <G.InputError>{pwMsg}</G.InputError>
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

import React from 'react';
import * as L from './Login.style';
import * as G from '../styles/globalCSS';

const Login: React.FC = () => {
  // const [loginData, setLoginData] = useState<{email:string;password:string}>({ email: "", password: "" });
  // const emailRegEx =
  // /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  return (
    <div className="flex flex-col px-10">
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
      <G.InputButtonActive>로그인</G.InputButtonActive>
      <div className="flex flex-row items-center self-end mt-3">
        <L.AnotherBtn className="mr-5">비밀번호 재설정</L.AnotherBtn>
        <L.AnotherBtn>회원가입</L.AnotherBtn>
      </div>
      <div className="flex flex-row mt-10 items-center mb-3">
        <L.LoginLine></L.LoginLine>
        <L.LoginLineText>또는</L.LoginLineText>
        <L.LoginLine></L.LoginLine>
      </div>
      <L.AnothLogin>
        <img src="src/assets/Login/google.png" className="mr-3" />
        구글 로그인
      </L.AnothLogin>
      <L.AnothLogin>
        <img src="src/assets/Login/naver.png" className="mr-3" />
        네이버 로그인
      </L.AnothLogin>
      <L.AnothLogin>
        <img src="src/assets/Login/kakao.png" className="mr-3" />
        카카오 로그인
      </L.AnothLogin>
    </div>
  );
};

export default Login;

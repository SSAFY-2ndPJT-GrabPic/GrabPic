import React from "react";
import * as L from './Login.style';
import * as G from '../styles/globalCSS'

const Login : React.FC = () => {
  // const [loginData, setLoginData] = useState<{email:string;password:string}>({ email: "", password: "" });
  // const emailRegEx =
  // /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;



  return (
    <div className="flex flex-col px-10">
      <div>test</div>
      <L.LoginText>test</L.LoginText>
      <G.InputContainer>
      </G.InputContainer>
      <div>test</div>
      <div>test</div>
      <div>test</div>
    </div>
  )
}

export default Login;
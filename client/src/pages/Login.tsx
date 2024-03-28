import { useEffect } from "react";
import { BasicLogin } from "../components/User/BasicLogin";
import { SocailLogin } from "../components/User/SocialLogin";

import { TokenRefresh,userInfo } from "../api/user";

import { httpStatusCode } from "../utils/http-status";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import * as R from '../recoil/atoms/UserState';

export const Login: React.FC = () => {
  
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState<boolean>(R.isLoginState);
  const setUserInfoState = useSetRecoilState(R.userInfoState);
  
  useEffect(() => {
    autoCheck();
  })

  const autoCheck = async () => {
    await TokenRefresh(
      async (response) => {
        if(response.status === httpStatusCode.OK && response.headers.access){
          localStorage.setItem('accessToken', response.headers.access);
          await userInfo(
            (response) => {
              setUserInfoState(response);
            },
            (error) => {
              console.log(error);
            }
          );
          setIsLogin(true);
          navigate('/');
        }
      },
      () => {
      }
    )
  }
  

  return (
    <div className="flex flex-col px-6">
      <BasicLogin/>
      <SocailLogin/>
    </div>
  );
};


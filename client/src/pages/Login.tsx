import { useEffect, useState } from 'react';
import { BasicLogin } from '../components/User/Login/BasicLogin';
import { SocailLogin } from '../components/User/Login/SocialLogin';
import { Forbidden } from '../components/User/Forbidden';

import { TokenRefresh, userInfo } from '../api/user';

import { httpStatusCode } from '../utils/http-status';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import * as R from '../recoil/atoms/UserState';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState<boolean>(R.isLoginState);
  const setUserInfoState = useSetRecoilState(R.userInfoState);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    console.log(document.documentElement.clientWidth);
    console.log(document.documentElement.clientHeight);
    if (document.documentElement.clientWidth > 700) {
      setIsMobile(false);
    } else {
      const isLogin = localStorage.getItem('isLogin');
      if (isLogin === 'true') autoCheck();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const autoCheck = async () => {
    await TokenRefresh(
      async (response) => {
        if (response.status === httpStatusCode.OK && response.headers.access) {
          localStorage.setItem('accessToken', response.headers.access);
          await userInfo(
            (response) => {
              setUserInfoState(response);
            },
            () => {}
          );
          setIsLogin(true);
          navigate('/');
        }
      },
      () => {}
    );
  };

  return (
    <div className="flex flex-col px-6">
      {isMobile && <BasicLogin />}
      {isMobile && <SocailLogin />}
      {!isMobile && <Forbidden />}
    </div>
  );
};

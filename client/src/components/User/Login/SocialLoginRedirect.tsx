import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useSetRecoilState } from 'recoil';
import * as R from '../../../recoil/atoms/UserState';
import * as S from '../../../recoil/atoms/SettingState'

import { userInfo } from '../../../api/user';
import { useNavigate } from 'react-router';

export const SocialLoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  const setIsModal = useSetRecoilState<boolean>(S.isModalState);
  const setIsModalNo = useSetRecoilState<number>(S.isModalNo);

  const setIsLogin = useSetRecoilState<boolean>(R.isLoginState);
  const setUserInfoState = useSetRecoilState(R.userInfoState);

  const [cookie] = useCookies(['access']);

  useEffect(() => {
    localSetToken();
    getUserInfo();
  });

  const getUserInfo = async () => {
    if (cookie.access) {
      await userInfo(
        (response) => {
          setUserInfoState(response);
          setIsLogin(true);
        },
        () => {
          localStorage.clear();
          setIsModal(true);
          setIsModalNo(0);
        }
      );
    } else {
      setIsModal(true);
      setIsModalNo(0);
    }
    navigate('/');
  };

  const localSetToken = () => {
    if (cookie.access) {
      localStorage.setItem('accessToken', cookie.access);
      localStorage.setItem('isLogin','true');
    }
  };

  return <></>;
};

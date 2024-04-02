import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const SocialLoginRedirect: React.FC = () => {
  const [cookie] = useCookies(['access']);

  useEffect(() => {
    getToken();
  });

  const getToken = () => {
    if (cookie.access) {
      localStorage.setItem('accessToken', cookie.access);
    }
  };

  return <></>;
};

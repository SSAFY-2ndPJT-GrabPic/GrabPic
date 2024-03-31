import { Routes, Route,useLocation  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState, userInfoState } from '../recoil/atoms/UserState';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Home from '../pages/Home';
import { Login } from '../pages/Login';
import { SocialLoginRedirect } from './User/Login/SocialLoginRedirect';
import ResetPw from '../pages/ResetPw';
import Join from '../pages/Join';
import Encyclopedia from '../pages/Encyclopedia';
import CollectDetail from '../pages/CollectDetail';
import ChatBot from '../pages/ChatBot';
import Map from '../pages/Map';
import Camera from '../pages/Camera';
import { EncyclopediaResgist } from './Encyclopedia/regist/EncyclopediaRegist';
import Gallery from '../pages/Gallery';
import SettingPage from '../pages/SettingPage';

import UserInfo from '../pages/UserInfo';
import MainLayout from '../MainLayout'

export default function Router() {
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useRecoilValue(userInfoState)

  useEffect(() => {
    if (!isLogin  && (!location.pathname.includes('resetpw') && !location.pathname.includes('join'))) {
      navigate('/login');
    }
  }, [isLogin, location.pathname, navigate])

  return (
    <Routes>
      {/* 헤더 & 네브를 넣을 페이지 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/encyclopedia/:nickname" element={<Encyclopedia userId={userInfo.userId} />} />
        <Route path="/detail/:collectName" element={<CollectDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/camera/*" element={<Camera />} />
        <Route path="regist" element={<EncyclopediaResgist/>}/>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/userinfo/*" element={<UserInfo />} />
      </Route>

      {/* 헤더 & 네브가 필요 없는 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/social" element={<SocialLoginRedirect />} />
      <Route path="/resetpw/*" element={<ResetPw />}/>
      <Route path="/join/*" element={<Join />} />
    </Routes>
  );
}

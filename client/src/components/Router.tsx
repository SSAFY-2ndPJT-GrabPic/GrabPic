import { Routes, Route,useLocation  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../recoil/atoms/UserState';
import { useNavigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ResetPw from '../pages/ResetPw';
import Join from '../pages/Join';
import Encyclopedia from '../pages/Encyclopedia';
import CollectDetail from '../pages/CollectDetail';
import ChatBot from '../pages/ChatBot';
import Map from '../pages/Map';
import Camera from '../pages/Camera';
import Gallery from '../pages/Gallery';
import SettingPage from '../pages/SettingPage';
import { useEffect } from 'react';

export default function Router() {
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (!isLogin  && (!location.pathname.includes('resetpw') && !location.pathname.includes('join'))) {
      navigate('/login');
    }
  }, [isLogin, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpw/*" element={<ResetPw />}/>
      <Route path="/join/*" element={<Join />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/encyclopedia" element={<Encyclopedia />} />
      <Route path="/encyclopedia/:collectName" element={<CollectDetail />} />
      <Route path="/map" element={<Map />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
}

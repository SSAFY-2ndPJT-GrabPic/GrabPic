import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';

import ResetPw from '../pages/ResetPw';
import Join from '../pages/Join';

import Encyclopedia from '../pages/Encyclopedia';
import ChatBot from '../pages/ChatBot';
import Map from '../pages/Map';
import Camera from '../pages/Camera';
import Gallery from '../pages/Gallery';
import SettingPage from '../pages/SettingPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpw/*" element={<ResetPw />}/>
      <Route path="/join" element={<Join />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/encyclopedia" element={<Encyclopedia />} />
      <Route path="/map" element={<Map />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
}

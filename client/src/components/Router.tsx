import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Encyclopedia from "../pages/Encyclopedia";
import ChatBot from "../pages/ChatBot";
import Map from "../pages/Map";
import Camera from "../pages/Camera";
import Gallery from "../pages/Gallery";
import SettingPage from "../pages/SettingPage";

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chatbot' element={<ChatBot />} />
      <Route path='/encyclopedia' element={<Encyclopedia />} />
      <Route path='/map' element={<Map />} />
      <Route path='/camera' element={<Camera />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/setting' element={<SettingPage />} />
    </Routes>
  );
}

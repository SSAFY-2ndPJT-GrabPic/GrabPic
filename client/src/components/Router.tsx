import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Camera from "../pages/Camera";
import Login from "../pages/Login";


export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/camera' element={<Camera />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

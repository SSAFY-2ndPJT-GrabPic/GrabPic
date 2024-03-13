import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
<<<<<<< HEAD
import Camera from "../pages/Camera";
import Login from "../pages/Login";

=======
import Encyclopedia from "../pages/Encyclopedia";
import ChatBot from "../pages/ChatBot";
>>>>>>> FE

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
<<<<<<< HEAD
      <Route path='/camera' element={<Camera />} />
      <Route path='/login' element={<Login />} />
=======
      <Route path='/chatbot' element={<ChatBot />} />
      <Route path='/encyclopedia' element={<Encyclopedia />} />
>>>>>>> FE
    </Routes>
  );
}

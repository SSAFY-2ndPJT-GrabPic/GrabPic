import { Routes, Route } from "react-router-dom"
import Chart from "../test/Chart"
import Home from "../pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chart' element={<Chart />} />
    </Routes>
  );
}

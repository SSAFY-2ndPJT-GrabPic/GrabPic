import { Routes, Route } from "react-router-dom"
import Chart from "../test/Chart"
import Map from "../test/Map"
import Home from "../pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chart' element={<Chart />} />
      <Route path='/map' element={<Map />} />
    </Routes>
  );
}

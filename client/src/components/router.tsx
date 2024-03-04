import { Routes, Route } from "react-router-dom"
import Chart from "../test/chart"
import Map from "../test/map"

export default function Router() {
  return (
    <Routes>
      <Route path='/chart' element={<Chart />} />
      <Route path='/map' element={<Map />} />
    </Routes>
  );
}

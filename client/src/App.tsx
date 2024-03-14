import { BrowserRouter as RouterProvider } from "react-router-dom";
import Router from "./components/Router"
import Header from "./components/Header/Header";
import NavBar from "./components/NavigationBar/NavigationBar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RouterProvider>
        <Header />
        <Router />
        <NavBar />
      </RouterProvider>
    </RecoilRoot>
  )
}

export default App

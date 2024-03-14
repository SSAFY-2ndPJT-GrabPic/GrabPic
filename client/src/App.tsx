import { BrowserRouter as RouterProvider } from "react-router-dom";
import Router from "./components/Router"
import Header from "./components/Header/Header";
import NavBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <>
      <RouterProvider>
        <Header />
        <Router />
        <NavBar />
      </RouterProvider>
    </>
  )
}

export default App

import { BrowserRouter as RouterProvider } from "react-router-dom";
import Router from "./components/Router"
import Header from "./components/Header/Header";
import NavBar from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <>
      <Header />
      <RouterProvider>
        <Router />
      </RouterProvider>
      <NavBar />
    </>
  )
}

export default App

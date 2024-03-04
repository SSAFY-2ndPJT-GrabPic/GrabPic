import { BrowserRouter as RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Router from "./components/router"

const Main = styled.div`
  height: 70px;
  color: #000000;
  text-align: center;
`

function App() {
  return (
    <>
      <Main className="text-3xl font-bold underline text-yellow-500">test</Main>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </>
  )
}

export default App

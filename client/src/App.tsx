import { BrowserRouter as RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import Header from './components/Header/Header';
import NavBar from './components/NavigationBar/NavigationBar';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { Modal } from './components/modal/Modal';


const BodyContainer = styled.div`
  position: fixed;
  top: 56px;
  bottom: 56px;
  width: 100%;
  padding-bottom: 10px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <Modal/>
      <RouterProvider>
          <Header />
          <BodyContainer>
            <Router />
          </BodyContainer>
          <NavBar />
      </RouterProvider>
    </RecoilRoot>
  );
}

export default App;

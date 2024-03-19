import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavigationBar/NavigationBar';
import styled from 'styled-components';


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
    <>
      <Header />
      <NavBar />
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </>
  );
}

export default App;

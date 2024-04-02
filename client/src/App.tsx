import { BrowserRouter as RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import { RecoilRoot } from 'recoil';
import { Modal } from './components/Modal/Modal';
import { Loading } from './components/Loading/Loading';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider>
      <Modal/>
      <Loading/>
        <Router />
      </RouterProvider>
    </RecoilRoot>
  );
}

export default App;

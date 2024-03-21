import { BrowserRouter as RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import { RecoilRoot } from 'recoil';
import { Modal } from './components/modal/Modal';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider>
      <Modal/>
        <Router />
      </RouterProvider>
    </RecoilRoot>
  );
}

export default App;

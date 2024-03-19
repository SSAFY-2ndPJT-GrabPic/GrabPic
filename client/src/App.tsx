import { BrowserRouter as RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import { RecoilRoot } from 'recoil';
import { Modal } from './components/modal/Modal';
import Filter from './components/Encyclopedia/Collection/Filter'

function App() {
  return (
    <RecoilRoot>
      <Modal/>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </RecoilRoot>
  );
}

export default App;

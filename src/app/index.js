import {Routes, Route, useNavigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import LoginPage from "./login";
// import Profile from '../components/profile';
import UserAccount from './user-account';
import { useEffect, useState } from 'react';
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  useInit(async () => {
    await store.actions.login.checkLogin();
  }, []);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/profile'} element={<UserAccount/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

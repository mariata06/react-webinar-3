import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/" element={<Main />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </Router>
  );
}

export default App;

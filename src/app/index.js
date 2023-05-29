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
  const [lang, setLang] = useState(true);
  const activeModal = useSelector(state => state.modals.name);

  const callbacks = {
    // Смена языка
    langChange: useCallback(() => setLang(prev => !prev), [lang])
  }

  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<Product lang={lang} setLang={callbacks.langChange}/>} />
        <Route path="/" element={<Main lang={lang} setLang={callbacks.langChange}/>} />
      </Routes>
      {activeModal === 'basket' && <Basket lang={lang}/>}
    </Router>
  );
}

export default App;


import {cn as bem} from '@bem-react/classname';
import './style.css';
import BasketTool from '../basket-tool';
import { Link } from 'react-router-dom';

function Navigation({sum, amount, openModalBasket, lang, setLang}) {
  const cn = bem('Navigation');
  return (

    <div className={cn()}>
        {lang?<Link to={`/`} className={cn('link')}>Главная</Link>:<Link className={cn('link')} to={`/`}>Main</Link>}
        <button onClick={() => setLang()} className={cn('btn')}>English / Russian</button>
        <BasketTool onOpen={openModalBasket} amount={amount} sum={sum} lang={lang}/>
    </div>

  );
}

export default Navigation;
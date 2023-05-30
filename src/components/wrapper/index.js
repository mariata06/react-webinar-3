import {cn as bem} from '@bem-react/classname';
import './style.css';
import BasketTool from '../basket-tool';
import Navigation from '../navigation';
import './style.css';

function Wrapper({sum, amount, openModalBasket, lang, setLang}) {
    const cn = bem('Wrapper');
    return (
        <div className={cn()}>
            <Navigation setLang={setLang} lang={lang}/>
            <BasketTool onOpen={openModalBasket} amount={amount} sum={sum} lang={lang}/>
        </div>
    );
}

export default Wrapper;
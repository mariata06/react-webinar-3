
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function Navigation({lang, setLang}) {
  const cn = bem('Navigation');
  return (

    <div className={cn()}>
      {lang?<Link to={`/`} className={cn('link')}>Главная</Link>:<Link className={cn('link')} to={`/`}>Main</Link>}
      <button onClick={() => setLang()} className={cn('btn')}>English / Russian</button>
    </div>

  );
}

export default Navigation;
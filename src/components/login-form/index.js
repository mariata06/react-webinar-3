import {memo} from "react";
// import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import Input from "../input";

function LoginForm() {
  const cn = bem('LoginForm');
  const {t} = useTranslate();
  return (
    <div className={cn()}>
        <form action="" className={cn('formwrapper')}>
            <h2 className={cn('title')}>{t('loginform.title')}</h2>
            <div className={cn('inputwrapper')}>
                <div className={cn('inputlabel')}>{t('loginform.inputlogin')}</div>
                <Input 
        
                    placeholder={'test'}
                />
            </div>

            <div className={cn('inputwrapper')}>
                <div className={cn('inputlabel')}>{t('loginform.inputpassword')}</div>
                <Input 
                    
                    placeholder={'•••'}
                />
            </div>
            <span className={cn('error')}>{t('loginform.error')}</span>
            <button className={cn('submit')}
                
            >{t('loginform.submit')}</button>
        </form>
    </div>
  );
}

export default memo(LoginForm);

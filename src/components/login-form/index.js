import {memo, useState} from "react";
// import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';
import useTranslate from "../../hooks/use-translate";
// import Input from "../input";
import useStore from "../../hooks/use-store";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
    const store = useStore();

    const navigate = useNavigate();

    const [enteredLogin, setEnteredLogin] = useState('');
    const [enteredPassword, setEnteredPassword] = useState(''); 
    const [error, setError] = useState('');

    const loginChangeHandler = (event) => {
        setEnteredLogin(event.target.value); 
        // console.log(event.target.value);
    } 

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value); 
        // console.log(event.target.value);
    }; 

    const submitHandler = async (event) => {
        event.preventDefault();
        // loginUser();
        await store.actions.login.setSession(enteredLogin,enteredPassword);

        if (store.getState().login.error === '') {
            await store.actions.profile.loadProfile(enteredLogin,enteredPassword);
            localStorage.setItem('token', JSON.stringify(store.getState().login.token));
            localStorage.setItem('uName', JSON.stringify(store.getState().login.uName));
            localStorage.setItem('login', JSON.stringify(enteredLogin));
            localStorage.setItem('password', JSON.stringify(enteredPassword));

            navigate('/');
        } else {
            setError(store.getState().login.error);
        }
    };

    const cn = bem('LoginForm');
    const {t} = useTranslate();
    return (
        <div className={cn()}>
            <form action="" className={cn('formwrapper')} onSubmit={submitHandler}>
                <h2 className={cn('title')}>{t('loginform.title')}</h2>
                <div className={cn('inputwrapper')}>
                    <div className={cn('inputlabel')}>{t('loginform.inputlogin')}</div>
                    <input 
                        value={enteredLogin}
                        onChange={loginChangeHandler}
                        placeholder={'test'}
                    />
                </div>

                <div className={cn('inputwrapper')}>
                    <div className={cn('inputlabel')}>{t('loginform.inputpassword')}</div>
                    <input 
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        placeholder={'•••'}
                    />
                </div>
                {error!==''&&<span className={cn('error')}>{error}</span>}
                <button className={cn('submit')}            
                >{t('loginform.submit')}</button>
            </form>
        </div>
    );
}

export default memo(LoginForm);

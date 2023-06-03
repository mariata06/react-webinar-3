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
        console.log(event.target.value);
    } 

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value); 
        console.log(event.target.value);
    }; 

    const loginUser = async() => {
        await fetch('/api/v1/users/sign',
        {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // "X-token": "fa57a7348079cd27f06260b99881e6d2b2fee56cff8e212a2cc2e89e0234243",
        },
        body: JSON.stringify({
                // "login": "test_1",
                // "password": "123456",
                "login": enteredLogin,
                "password": enteredPassword,
                "remember": true
            }),
            
        }).then(response => response.json())
        .then(result => {
            // console.log(result);
            // if (result.result) {
            //     console.log(result.result.token);
            //     console.log(result.result.user.email);
            //     console.log(result.result.user.profile.name);
            //     console.log(result.result.user.profile.phone);
            // }

            // if (result.error) console.log(result.error.message);

            if (result.result) {
                store.setState({
                    ...store.getState(),
                    uName: result.result.user.profile.name,
                    uPhone: result.result.user.profile.phone,
                    uEmail: result.result.user.email,
                }, 'Загружен профиль из АПИ');
            }

            if (result.error) {
                setError(result.error.message);
            }

            if (result.result) {
                navigate('/');
            }
        })

            console.log(store);  
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // props.loginUser();
        loginUser();
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
                        // value={props.value}
                        // onChange={props.onChange}
                        // type={props.type}
                        placeholder={'test'}
                    />
                </div>

                <div className={cn('inputwrapper')}>
                    <div className={cn('inputlabel')}>{t('loginform.inputpassword')}</div>
                    <input 
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        // value={props.value}
                        // onChange={props.onChange}
                        // type={props.type}
                        placeholder={'•••'}
                    />
                </div>
                <span className={cn('error')}>{error}</span>
                <button className={cn('submit')}            
                >{t('loginform.submit')}</button>
            </form>
        </div>
    );
}

export default memo(LoginForm);

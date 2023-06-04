import {memo, useMemo, useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link, useNavigate} from "react-router-dom";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";
import useStore from "../../hooks/use-store";

function UserNav({uName}) {
    // Функция для локализации текстов
    const {t} = useTranslate();
    
    const [auth, setAuth] = useState(false);
    const store = useStore();
    const navigate = useNavigate();

    useEffect(()=>{
        if (store.getState().token && store.getState().token !== '') {
            setAuth(true);
        } else {
            setAuth(false);
        }
    },[store.getState().token])
    
    const onNavigate = async (act) => {
        if(act === 'logout'){
            console.log('выход');

            await fetch('/api/v1/users/sign',
            {
                method: 'DELETE',
                headers: {
                    "X-token": store.getState().token,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json())
            .then(result => {
                console.log(result);
            });

            store.setState({
                ...store.getState(),
                token: '',
                uName: '',
                uPhone: '',
                uEmail: '',
            }, 'Logout');
            navigate('/');
        } 
        if (act === 'profile') {
            console.log('профиль');

            // console.log('token: ', store.getState().token);
            await fetch('/api/v1/users/self',
                {
                    method: 'GET',
                    headers: {
                        "X-token": store.getState().token,
                        "Content-Type": "application/json",
                    },
                }).then(response => response.json())
                .then(result => {
                    // console.log(result);
                    if (result.error) {
                        console.log('токен не совпал');
                        store.setState({
                            ...store.getState(),
                            token: '',
                            uName: '',
                            uPhone: '',
                            uEmail: '',
                        }, 'Logout');
                        navigate('/login');
                    }
                })
        } 
        if (act === 'login') {
            console.log('вход');
        }
    }

    const cn = bem('UserNav');

    return (
        <SideLayout side='end'>
            <ul className={cn()}>
                <li className={cn('itemUser')}>
                    <Link to='/profile' onClick={() => onNavigate('profile')}>{uName}</Link>
                </li>
                <li className={cn('item')}>
                    <Link to={auth?'/':'/login'} onClick={() => onNavigate(auth?'logout':'login')}>{t(auth?'usermenu.logout':'usermenu.login')}</Link>
                </li>
            </ul>
        </SideLayout>
    )
}

UserNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
  onNavigate: PropTypes.func
}

UserNav.defaultProps = {
  items: [],
  onNavigate: () => {}
}

export default memo(UserNav);
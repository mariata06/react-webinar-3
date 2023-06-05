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
        if (store.getState().login.token && store.getState().login.token !== '') {
            setAuth(true);
        } else {
            setAuth(false);
        }
    },[store.getState().login.token])
    
    const onNavigate = async (act) => {
        if(act === 'logout'){
            console.log('выход');

            await fetch('/api/v1/users/sign',
            {
                method: 'DELETE',
                headers: {
                    "X-token": store.getState().login.token,
                    "Content-Type": "application/json",
                },
            }).then(response => response.json())
            .then(result => {
                console.log(result);
            });

            store.setState({
                ...store.getState(),
                login: {},
                profile: {}
            });

            navigate('/');
        } 
        if (act === 'profile') {
            console.log('профиль');

            await fetch('/api/v1/users/self',
                {
                    method: 'GET',
                    headers: {
                        "X-token": store.getState().login.token,
                        "Content-Type": "application/json",
                    },
                }).then(response => response.json())
                .then(result => {
                    // console.log(result);
                    if (result.error) {
                        console.log('токен не совпал');
                        store.setState({
                            ...store.getState(),
                            login: {},
                            profile: {}
                        });
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
                {auth && <li className={cn('itemUser')}>
                    <Link to='/profile' onClick={() => onNavigate('profile')}>{uName}</Link>
                </li>}
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
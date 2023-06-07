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
    // console.log(uName);
    
    // const [name, setName] = useState(uName);
    const store = useStore();
    const navigate = useNavigate();

    const [auth, setAuth] = useState(store.getState().login.auth);
    useEffect(() => {
        setAuth(store.getState().login.auth);
    }, [store.getState().login.auth]);
    
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

            localStorage.clear();

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
            setAuth(true);
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
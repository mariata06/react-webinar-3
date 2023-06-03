import {memo, useMemo, useEffect} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";
import useStore from "../../hooks/use-store";

function UserNav({uName}) {
    // Функция для локализации текстов
    const {t} = useTranslate();
    const store = useStore();
    // console.log('usernav',uName);
    
    const onNavigate = (item) => {
        if(uName && item.title !== uName){
            store.setState({
                ...store.getState(),
                uName: '',
                uPhone: '',
                uEmail: '',
            }, 'Logout');
        }
    }

    const options = {
        usermenu: useMemo(() => ([
            {key: 2, title: uName, link: '/profile'},
            {key: 3, title: t(uName?'usermenu.logout':'usermenu.login'), link: uName?'/':'/login'},
            // {key: 4, title: t('usermenu.logout'), link: '/'},
            
        ]), [t])
    };

    const cn = bem('UserNav');

    return (
        <SideLayout side='end'>
            <ul className={cn()}>
                {options.usermenu.map(item => {
                    if (item.title) {
                        let flag = uName === item.title;
                        return (
                            <li key={item.key} className={flag?cn('itemUser'):cn('item')}>
                                <Link to={item.link} onClick={() => onNavigate(item)}>{item.title}</Link>
                            </li>
                        )
                    }
                })}
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
import {memo, useMemo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";

function UserNav({items, onNavigate}) {
    // Функция для локализации текстов
    const {t} = useTranslate();

    const options = {
        usermenu: useMemo(() => ([
            {key: 2, title: t('usermenu.login'), link: '/login'},
            {key: 3, title: t('usermenu.logout'), link: '/'},
            {key: 4, title: t('usermenu.profile'), link: '/profile'},
        ]), [t])
    };

    const cn = bem('UserNav');

    return (
        <SideLayout side='end'>
            <ul className={cn()}>
                {options.usermenu.map(item => (
                    <li key={item.key} className={cn('item')}>
                    <Link to={item.link} onClick={() => onNavigate(item)}>{item.title}</Link>
                    </li>
                ))}
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
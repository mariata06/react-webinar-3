import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
// import BasketTool from "../../components/basket-tool";
import SideLayout from "../../components/side-layout";

function LoginHeader() {

  // Функция для локализации текстов
  const {t} = useTranslate();

  const options = {
    menu: useMemo(() => ([
      {key: 2, title: t('menu.login'), link: '/login'},
      {key: 3, title: t('menu.logout'), link: '/'},
      {key: 4, title: t('menu.profile'), link: '/profile'},
    ]), [t])
  };

  return (
    <SideLayout side='end'>
      <Menu items={options.menu} onNavigate={callbacks.onNavigate}/>
    </SideLayout>
  );
}

export default memo(LoginHeader);

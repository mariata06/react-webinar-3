import {memo, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import UserNav from '../../components/user-nav';

function Main() {
  const store = useStore();

  const {t} = useTranslate();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const [uName,setUname] = useState(JSON.parse(localStorage.getItem('uName')));

  useEffect(() => {
    let token = localStorage.getItem('token');
    let uName = localStorage.getItem('uName');
    let login = localStorage.getItem('login');
    let password = localStorage.getItem('password');

    if (token){
      const checkToken = async (token) => {
        await fetch('/api/v1/users/self',
        {
            method: 'GET',
            headers: {
                "X-token": JSON.parse(token),
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
        .then(result => {
            if (result.error) {
                console.log('токен не совпал');
            } else {
              console.log('токен проходит')
  
              store.actions.login.setSession(JSON.parse(login), JSON.parse(password));
              store.actions.profile.loadProfile(JSON.parse(login), JSON.parse(password));
              setUname(uName);
            }
        })
      }
      checkToken(token);
    }
  }, []);

  return (
    <PageLayout>
      {/* <LoginHeader /> */}
      {/* <UserNav uName={store.getState().profile.uName}/> */}
      <UserNav uName={uName}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);

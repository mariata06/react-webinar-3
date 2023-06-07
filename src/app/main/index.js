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
import navigation from '../../containers/navigation';

function Main() {
  const store = useStore();

  const {t} = useTranslate();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  return (
    <PageLayout>
      {/* <LoginHeader /> */}
      {/* <UserNav uName={store.getState().profile.uName}/> */}
      <UserNav uName={store.getState().login.uName}/>
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

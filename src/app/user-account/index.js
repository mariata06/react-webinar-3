import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
// import Spinner from "../../components/spinner";
// import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
// import LoginHeader from '../../containers/login-header';
import Profile from '../../components/profile';
import UserNav from '../../components/user-nav';

function UserAccount() {
  const store = useStore();
  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserNav uName={store.getState().uName}/>
      {/* <LoginHeader /> */}
      <Head title={t('title')}/>
        {/* <LocaleSelect/> */}
      {/* </Head> */}
      <Navigation/>
      <Profile uName={store.getState().uName} uPhone={store.getState().uPhone} uEmail={store.getState().uEmail}/>
    </PageLayout>
  );
}

export default memo(UserAccount);
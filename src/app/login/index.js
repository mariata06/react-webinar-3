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
import LocaleSelect from "../../containers/locale-select";
// import LoginHeader from '../../containers/login-header';
import LoginForm from '../../components/login-form';
import UserNav from '../../components/user-nav';

function LoginPage() {
  const store = useStore();
  const {t} = useTranslate();

  return (
    <PageLayout>
      {/* <UserNav uName={store.getState().profile.uName}/> */}
      <UserNav uName={store.getState().login.uName}/>
      {/* <LoginHeader /> */}
      <Head title={t('title')}/>
        {/* <LocaleSelect/> */}
      {/* </Head> */}
      <Navigation/>
      <LoginForm />
    </PageLayout>
  );
}

export default memo(LoginPage);
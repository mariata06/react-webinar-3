import {memo, useEffect, useState} from "react";
// import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';
import useTranslate from "../../hooks/use-translate";
// import Input from "../input";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function Profile(props) {
  const cn = bem('Profile');
  const {t} = useTranslate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const store = useStore();
  useInit(async () => {
    await store.actions.profile.loadProfile();
    setName(store.getState().profile.uName);
    setEmail(store.getState().profile.uEmail);
    setPhone(store.getState().profile.uPhone);
  }, []);

  return (
    <div className={cn()}>
        <div className={cn('wrapper')}>
            <h2 className={cn('title')}>{t('profile.title')}</h2>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    {t('profile.username')}&nbsp;
                </div>
                {/* {props.uName} */}
                {name}
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    {t('profile.userphone')}&nbsp;
                </div>
                {/* {props.uPhone} */}
                {phone}
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    email:&nbsp;
                </div>
                {/* {props.uEmail} */}
                {email}
            </div>

        </div>
    </div>
  );
}

export default memo(Profile);

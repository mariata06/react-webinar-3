import {memo} from "react";
// import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';
import useTranslate from "../../hooks/use-translate";
// import Input from "../input";

function Profile(props) {
  const cn = bem('Profile');
  const {t} = useTranslate();
  return (
    <div className={cn()}>
        <div className={cn('wrapper')}>
            <h2 className={cn('title')}>{t('profile.title')}</h2>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    {t('profile.username')}&nbsp;
                </div>
                {props.uName}
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    {t('profile.userphone')}&nbsp;
                </div>
                {props.uPhone}
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    email:&nbsp;
                </div>
                {props.uEmail}
            </div>

        </div>
    </div>
  );
}

export default memo(Profile);

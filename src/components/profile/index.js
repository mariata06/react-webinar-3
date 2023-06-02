import {memo} from "react";
// import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';
import useTranslate from "../../hooks/use-translate";
// import Input from "../input";

function Profile({data}) {
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
                User №1
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    {t('profile.userphone')}&nbsp;
                </div>
                +70000000001
            </div>

            <div className={cn('datawrapper')}>
                <div className={cn('datalabel')}>
                    email:&nbsp;
                </div>
                test_50@example.com
            </div>

        </div>
    </div>
  );
}

export default memo(Profile);

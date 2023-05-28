import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      {lang?<span className={cn('label')}>В корзине:</span>:<span className={cn('label')}>In basket:</span>}
      {lang?<span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>:
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, {one:'item', few:'items', many:'items'})} / ${numberFormat(sum)} ₽`
        : `empty`
      }
      </span>}
      {lang?<button onClick={onOpen}>Перейти</button>:<button onClick={onOpen}>Go to basket</button>}
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
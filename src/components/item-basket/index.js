import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import { Link } from "react-router-dom";

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id)
  };
  
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/product/${props.item._id}`} className={cn('link')} onClick={() => props.closeModal()}>
        <div className={cn('title')}>
          {props.item.title}
        </div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        {props.lang?<div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>:
          <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} pcs</div>}
        <div className={cn('cell')}>
          {props.lang?<button onClick={callbacks.onRemove}>Удалить</button>:
            <button onClick={callbacks.onRemove}>Delete</button>}
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);

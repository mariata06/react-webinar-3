import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function Item(props){
  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <>
      <div className={cn()}>
        {/*<div className={cn('code')}>{props.item._id}</div>*/}
          <Link to={`/product/${props.item._id}`} className={cn('link')}>
            <div className={cn('title')}>
              {props.item.title}
            </div>
          </Link>
        <div className={cn('actions')}>
          <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
          {props.lang?<button onClick={callbacks.onAdd}>Добавить</button>:<button onClick={callbacks.onAdd}>Add</button>}
        </div>
      </div>
    </>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);

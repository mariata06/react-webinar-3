import React, {useState} from "react";
import PropTypes from "prop-types";
// import {plural} from "../../utils";
import './style.css';
import Controls from "../controls";

function Item(props){
  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {/* {props.item.title} {count ? ` | Выделяли ${count} ${plural(count, {one: 'раз', few: 'раза', many: 'раз'})}` : ''} */}
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price}&nbsp;₽
      </div>
      { props.item.amount && <div className='Item-amount'>
        {props.item.amount}&nbsp;шт
      </div>}
      <div className='Item-actions'>
        { !props.onDeleteItem ? <Controls onAdd={props.onAdd} btnName={'Добавить'} item={props.item}/> :
          <Controls onDeleteItem={props.onDeleteItem} btnName={'Удалить'} item={props.item}/>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  // onDelete: PropTypes.func,
  // onSelect: PropTypes.func
  onAdd: PropTypes.func
};

Item.defaultProps = {
  // onDelete: () => {},
  // onSelect: () => {},
  onAdd: () => {}
}

export default React.memo(Item);

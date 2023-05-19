import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Controls from "../controls";

function Item(props){
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {(props.item.price+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;₽
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
  onAdd: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  // onDeleteItem: () => {}
}

export default React.memo(Item);

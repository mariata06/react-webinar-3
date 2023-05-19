import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd, goToCart, btnName, item, onDeleteItem}){
  return (
    <div className='Controls'>
      { onDeleteItem ? <button onClick={() => onDeleteItem(item.code)}>{btnName}</button> :
         item ? <button onClick={() => onAdd(item)}>{btnName}</button> :
          <button onClick={() => goToCart()}>{btnName}</button>
      }
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  goToCart: PropTypes.func,
  onDeleteItem: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {},
  goToCart: () => {},
  // onDeleteItem: () => {}
}

export default React.memo(Controls);

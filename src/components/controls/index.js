import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd, goToCart, btnName, item}){
  return (
    <div className='Controls'>
      {/* <button onClick={() => onAdd()}>{name}</button> */}
      { item ? <button onClick={() => onAdd(item.code)}>{btnName}</button> : <button onClick={() => goToCart()}>{btnName}</button>}
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  goToCart: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {},
  goToCart: () => {}
}

export default React.memo(Controls);

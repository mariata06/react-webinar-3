import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import Head from "../head";
// import {useState} from "react";
import Controls from "../controls";
import List from "../list";
import './style.css';

function Modal({cart, onDeleteItem, goToCart, totalCost}){
    
    

  return (
    <div className='Modal'>
    {/* {
      cart.map(item =>
        <div key={item.code} className='Cart-item'>
          <Item item={item} onDelete={onDelete}/>
        </div>
      )} */}
      <div className="Modal-content">

      
        <div className="Modal-wrapper">
            <Head title='Корзина'/>
            <Controls goToCart={goToCart} btnName={'Закрыть'}/>
        </div>
        <List list={cart}
                // onDeleteItem={callbacks.onDeleteItem}
                // onSelectItem={callbacks.onSelectItem}
                onDeleteItem={onDeleteItem} 
                />
            <div className="Modal-total">
                <span>Итого&nbsp;</span>
                <div className='Modal-amount'>{totalCost}&nbsp;₽</div>
            </div>
        </div>    
    </div>
  )
}

export default React.memo(Modal);
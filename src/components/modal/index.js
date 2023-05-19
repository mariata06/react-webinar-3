import React from "react";
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import './style.css';

function Modal({cart, onDeleteItem, goToCart, totalCost}){
    return (
        <div className='Modal'>
            <div className="Modal-content">
                <div className="Modal-wrapper">
                    <Head title='Корзина'/>
                    <Controls goToCart={goToCart} btnName={'Закрыть'} />
                </div>
                <List list={cart} onDeleteItem={onDeleteItem} />
                <div className="Modal-total">
                    <span>Итого&nbsp;</span>
                    <div className='Modal-amount'>{(totalCost+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;₽</div>
                </div>
            </div>    
        </div>
    )
}

export default React.memo(Modal);
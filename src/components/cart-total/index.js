import React from "react";
import './style.css';

function CartTotal({totalAmount, totalCost}) {
    if (totalAmount > 0) {
        return (
            <div className='CartTotal'>
                <span>В корзине:&nbsp;</span>
                <div className='CartTotal-amount'>{totalAmount}&nbsp; товар &nbsp;/&nbsp;</div>
                <div className='CartTotal-cost'>{totalCost}&nbsp;₽</div>
            </div>
        );    
    }
}

export default React.memo(CartTotal);

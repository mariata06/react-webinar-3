import React from "react";
import './style.css';
import {plural} from "../../utils";

function CartTotal({totalAmount, totalCost}) {
    if (totalAmount > 0) {
        return (
            <div className='CartTotal'>
                <span>В корзине:&nbsp;</span>
                <div className='CartTotal-amount'>{totalAmount}&nbsp; {plural(totalAmount, {one: 'товар', few: 'товара', many: 'товаров'})} &nbsp;/&nbsp;</div>
                <div className='CartTotal-cost'>{(totalCost+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;₽</div>
            </div>
        );    
    }
}

export default React.memo(CartTotal);

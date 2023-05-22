import React from "react";
import './style.css';
import {plural} from "../../utils";
import PropTypes from "prop-types";

function CartTotal({totalAmount, totalCost}) {
    if (totalAmount > 0) {
        return (
            <div className='CartTotal'>
                <span>В корзине:&nbsp;</span>
                <div className='CartTotal-amount'>{totalAmount}&nbsp; {plural(totalAmount, {one: 'товар', few: 'товара', many: 'товаров'})} &nbsp;/&nbsp;</div>
                <div className='CartTotal-cost'>{(totalCost+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;₽</div>
            </div>
        );    
    } else {
        return (
            <div className='CartTotal'>
                <span>В корзине:&nbsp;</span>
                <div className="CartTotal-amount">&nbsp;пусто</div>
            </div>
        )        
    }
} 

CartTotal.propTypes = {
    totalAmount: PropTypes.number,
    totalCost: PropTypes.number,
};

export default React.memo(CartTotal);
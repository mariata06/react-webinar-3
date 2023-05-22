import React from "react";
import List from "../list";
import './style.css';
import PropTypes from "prop-types";

function Cart({cart, onDeleteItem, totalCost}){
    return (
        <div className='Cart'>
            <div className="Cart-content">
                <List list={cart} onDeleteItem={onDeleteItem} />
                <div className="Cart-total">
                    <span>Итого&nbsp;</span>
                    <div className='Cart-amount'>{(totalCost+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}&nbsp;₽</div>
                </div>
            </div>    
        </div>
    )
}

Cart.propTypes = {
    children: PropTypes.node
}

export default React.memo(Cart);
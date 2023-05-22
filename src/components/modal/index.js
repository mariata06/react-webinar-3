import React from "react";
import Head from "../head";
import Controls from "../controls";
import './style.css';
import PropTypes from "prop-types";

function Modal({children, btnName, title, goToCart}) {
    return (
        <div className='Modal'>
            <div className="Modal-content">
                <div className="Modal-wrapper">
                    <Head title={title}/>
                    <Controls goToCart={goToCart} btnName={btnName} /> 
                </div>  
                {children}
            </div>    
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node
}

export default React.memo(Modal);
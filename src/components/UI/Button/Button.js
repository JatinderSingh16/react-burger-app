import React from 'react';
import './Button.css';

const Btn = "Button";

const button = (props) => {
  
        return(
            <button
                className = {[Btn , props.btnType].join(' ')} 
                disabled = {props.disabled}
                onClick={props.clicked}>{props.children}
            </button>
        );
    }

export default button;


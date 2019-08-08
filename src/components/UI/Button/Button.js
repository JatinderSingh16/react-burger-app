import React from 'react';
import './Button.css';
const Btn = "Button";


const button = (props) => (
    <button
    className = {[Btn , props.btnType].join(' ')} 
     onClick={props.clicked}>{props.children}</button>
);

export default button;


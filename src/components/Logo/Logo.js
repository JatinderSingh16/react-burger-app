import React from 'react';
import BurgerLogo from '../../assets/images/burger_logo.png';
import './Logo.css';

const logo = (props) =>(
    <div 
        className="Logo" 
        style={{height: props.height}}>
       <img src={BurgerLogo} alt = "MyBurger"/>
    </div>
);

export default logo;
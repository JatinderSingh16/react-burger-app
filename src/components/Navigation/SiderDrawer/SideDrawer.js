import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
     let cssAdd = ["SideDrawer" , "Close"];
     if(props.open){
        cssAdd = ["SideDrawer" , "Open"];
     }
    return(
        <Aux>
          <Backdrop show={props.open} clicked={props.closed}/>
            <div className={cssAdd.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
            );
    
}


export default sideDrawer;
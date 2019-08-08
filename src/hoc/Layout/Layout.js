import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SiderDrawer/SideDrawer'


class Layout extends Component{
    state = {
        showSideDrawer:false
    }

    SideDrawerClosedHandler = () => {
           this.setState({
               showSideDrawer:false
           })
    }

    SideDrawerToggleHandler = () => {
         this.setState(( prevState ) => {
             return { showSideDrawer : !prevState.showSideDrawer};
         });
    }

   render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <div>Toolbar , SideDrawer,Backdrop</div>
                <main className="Content">
                    {this.props.children} 
                </main>
            </Aux>
        );
        }
}

export default Layout;
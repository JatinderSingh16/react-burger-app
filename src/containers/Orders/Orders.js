import React , {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {
    
    componentDidMount(){
      this.props.onFetchingOrders();
    }
  render(){

       return(
            <div>
                {this.props.loading ? <Spinner/> : 
                    this.props.orders.map((order) => (
                        <Order 
                        key = {order.id}
                        ingredients = {order.ingredients}
                        price = {+order.price}
                        />
                    ))
                }
            </div>        
        );
    }

}

const mapStateToProps = state => {
    return {
       orders:state.order.orders,
       loading:state.order.loading
    };
 }
 
 
 const mapDispatchToProps = dispatch => {
   return {
       onFetchingOrders: () => dispatch(actions.fetchOrders())
     };
 }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
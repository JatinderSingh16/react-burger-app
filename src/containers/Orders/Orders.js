import React , {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }
    componentDidMount(){

        axios.get('/orders.json')
        .then(res => {
            const fetchOrers = [];
             for(let key in res.data){
                fetchOrers.push({
                    ...res.data[key],
                    id:key
                
                });
             }
             this.setState({
                 loading:false,
                 orders:fetchOrers
                });
         })
        .catch(error => {
           this.setState({loading:false});
         });
    }
  render(){

       return(
            <div>
                {this.state.loading ? <Spinner/> : 
                    this.state.orders.map((order) => (
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

export default withErrorHandler(Orders,axios);
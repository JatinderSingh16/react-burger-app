import React ,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
  
   checkoutCancelled = () => {
      this.props.history.goBack();
   }
   

   checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
   }

    render(){
        let summery = <Redirect to="/"/>
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
           summery =(
             <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} 
                    />
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component = {ContactData}
                    />
            </div>
           ); 
        }
        return(
            <div>
              {summery}
            </div>
        );
    }
}


const mapStateToProps = state => {
  return {
      ings:state.burgerBuilder.ingredients,
      price:state.burgerBuilder.totalPrice,
      purchased:state.order.purchased
  };
}


export default connect(mapStateToProps)(Checkout);
import React , {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component{

    state = {
        purchasing:false, 
    }
   
    componentDidMount (){
      console.log(this.props)
      this.props.onInitIngredients();   
    }

    updatedPurchaseState (ingredient) {
        //ordder Now enable or disable
        const sum = Object.keys(ingredient)
        .map(igKey => {
          return ingredient[igKey];
        })
        .reduce((sum,el) => {
          return sum + el;
        },0);

        return sum> 0;
    }

    purchaseHandler = () => {
     //Open Modal
      this.setState({
        purchasing: true
      });
    }

    purchaseCancelHandler = () => {
        //close Modal  
      this.setState({
            purchasing:false
          });
    }

    purchaseContinueHandler = () => {
      this.props.onPurchaseInit();
      this.props.history.push('/checkout');
    } 

    render(){
      const disabledInfo = {
        //for check incredient count if 0 or less disable return true or false
        ...this.props.ings
      };

      for(let key in disabledInfo){
          disabledInfo[key] =  disabledInfo[key] <= 0
      }

       let orderSummary = null;
       let burger = this.props.error ? <p>Ingredient can't be loaded </p> : <Spinner/> 

       if(this.props.ings){
          burger = (<Aux>
                            <Burger ingredients = {this.props.ings}/>
                            <BuildControls 
                            disabled = {disabledInfo} 
                            ingredientAdded = {this.props.onIngredientAdded} 
                            ingredientDeduct={this.props.onIngredientRemoved}
                            price = {this.props.price}
                            purchaseable = {this.updatedPurchaseState(this.props.ings)}
                            ordered = {this.purchaseHandler}
                            />
                      </Aux>
                    );

          orderSummary = <OrderSummary  
                    ingredients = {this.props.ings}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler} 
                    price = {this.props.price}
                    />;

        }
         
      return (
          <Aux>
             <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
             </Modal>
            {burger}
          </Aux>
      );
    }
}

const mapStateToProps = state => {
   return {
       ings:state.burgerBuilder.ingredients,
       price:state.burgerBuilder.totalPrice,
       error:state.burgerBuilder.error
   };
}


const mapDispatchToProps = dispatch => {
  return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onPurchaseInit:() => dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));
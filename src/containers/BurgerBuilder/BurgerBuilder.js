import React , {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
   salad : 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7    
}

class BurgerBuilder extends Component{

    state = {
        ingredients:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error:false,
    }
   
    componentDidMount (){
         axios.get('https://react-burger-app-3367b.firebaseio.com/ingredients.json')
          .then(response => {
              this.setState({
                ingredients:response.data
              })
           })
           .catch(error => {
              this.setState({
                error: true
              })
           });
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

        this.setState({purchaseable: sum> 0})
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updateCount;
      const priceAddition =  INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({
        totalPrice: newPrice,
        ingredients : updatedIngredients
      }) 
       this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount - 1;
      if(oldCount <= 0 ){
        return ; //return true of false 
      }
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updateCount;
      const priceDeduction =  INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({
        totalPrice: newPrice,
        ingredients : updatedIngredients
      }) 
      this.updatedPurchaseState(updatedIngredients);
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
      
      const queryParams = [];
      for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        
      }
      queryParams.push('price=' + this.state.totalPrice);
      
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
      });
    } 

    render(){
      const disabledInfo = {
        //for check incredient count if 0 or less disable return true or false
        ...this.state.ingredients
      };

      for(let key in disabledInfo){
          disabledInfo[key] =  disabledInfo[key] <= 0
      }

       let orderSummary = null;
       let burger = this.state.error ? <p>Ingredient can't be loaded </p> : <Spinner/> 

       if(this.state.ingredients){
          burger = (<Aux>
                            <Burger ingredients = {this.state.ingredients}/>
                            <BuildControls 
                            disabled = {disabledInfo} 
                            ingredientAdded = {this.addIngredientHandler} 
                            ingredientDeduct={this.removeIngredientHandler}
                            price = {this.state.totalPrice}
                            purchaseable = {this.state.purchaseable}
                            ordered = {this.purchaseHandler}
                            />
                      </Aux>
                    );

          orderSummary = <OrderSummary  
                    ingredients = {this.state.ingredients}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler} 
                    price = {this.state.totalPrice}
                    />;

        }
        if(this.state.loading){
          orderSummary = <Spinner/>
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

export default WithErrorHandler(BurgerBuilder,axios);
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import { fetchIngredientsFailed } from '../actions/burgerBuilder';

const initialState = {
  ingredients:null,
  totalPrice:4,
  error:false,
};

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7    
 }

 const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }  
   return updateObject(state,updatedState);
 }

 const removeIngredients = (state,action) => {
    const updatedIngr = {[action.ingredientName]:state.ingredients[action.ingredientName] - 1}
    const updatedIngrs = updateObject(state.ingredients,updatedIngr);
    const updatedStat = {
        ingredients:updatedIngrs,
        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }  
return updateObject(state,updatedStat);
 }

 const setIngredients =(state,action) => {
    return updateObject(state,
        {
            ingredients:{
                salad : action.ingredients.salad,
                cheese : action.ingredients.cheese,
                meat : action.ingredients.meat,
                bacon : action.ingredients.bacon,
            },
            error:false
        });
 }

 const fetchIngredientsFailed = (state,action) => {
    return updateObject(state,{
        error:true
    });
 }
 
const reducer = (state = initialState, action) => {
   switch (action.type){
       case actionTypes.ADD_INGREDIENT:return addIngredients(state,action);
       case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action);
       case actionTypes.SET_INGREDIENTS:return setIngredients(state,action);
       case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action);        
       default: return state;
   }
};

export default reducer;

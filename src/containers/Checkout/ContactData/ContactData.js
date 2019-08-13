import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true
            }
        },
      formIsValid:false,
  }

  orderHandler = (event) => {
      event.preventDefault();

      if(!this.state.formIsValid){
        return alert('Please enter valid inputs')
      }
      const formData = {};

      for(let formDataIdentifier in this.state.orderForm){

        formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
      }
      this.setState({loading:true});
      const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData : formData
      }
      //dispatch fuction
     this.props.onOrderBurger(order);
  }

  //Input Values get
  inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = { 
        ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedOrderForm[inputIdentifier]=updatedFormElement;
         let formIsValid = true;
         for(let inputIdentifier in updatedOrderForm){
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; 
         }
        this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValid
        })
  }

  //validation
  checkValidity(value,rules){
     let isValid = true;
   
     if(!rules){
         return true;
     }
     
     if(rules.required){
         isValid = value.trim() !== '' && isValid;
     }

     if(rules.minLength){
         isValid = value.length >= rules.minLength && isValid;
     }
     if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

     return isValid;
  }

  render(){
      const formElementArray = [];
      for(let key in this.state.orderForm){
       // get array from state
            formElementArray.push({
                    id: key,
                    config:this.state.orderForm[key]
            });
       }
      let form =(
        <form onSubmit={this.orderHandler}>
           {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event,formElement.id)}
                    />
           ))}
           <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      );

      if(this.props.loading){
        form = <Spinner />;
      }
      return(
          <div className="ContactData">
                <h4>Enter your Contact Data </h4>
               {form} 
          </div>
      );
  }
}


const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    };
  }

  const mapDispatchToProps = dispatch => {
      return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
      };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
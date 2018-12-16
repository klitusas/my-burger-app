import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    /**
     * NOT REDUX: 
     * Local UI state, we dont need the information 
     * about  our form anywhere in application;
     * However we use 'ingredients' here
    */
    state = {
        orderForm: {
            name: {
                elemenType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                //check if input was touched
                touched: false

            },
            street: {
                elemenType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elemenType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLengh: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elemenType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elemenType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elemenType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                //will not fail just return undefined
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //Removed by REDUX
        // this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            formData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

        /**  
         * REDUX: now handled by redux
            axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                // normally would be : 
                // this.props.history.push('/')
                // due to the way we are rendering content data,
                // basically by rendering it manually in the Route -> render()
                // we dont have history object available. Could wrap this component 
                // with withRouter(ContactData), the other would be to pass history 
                // on to ContactData.
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            })
        */
    }

    checkValidity(value, rules) {
        let isValid = true;
        /** 
         * we check one if after the other
         * this means that only the last isValid
         * will be considered for return -> we fixed it by 
         * adding '&& isValid';
        */
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLengh) {
            isValid = value.length >= rules.minLengh && isValid;;
        }
        if (rules.maxLengh) {
            isValid = value.length <= rules.maxLengh && isValid;;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        /**
         *  UPDATE IMUTABLY
         *  with spread operator only you dont clone deepely.
         *  so to clone deeply we access and clone (with spead) 'updatedOrderForm[inputIdentifier]'
         */
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        // - name: {,  street: { - part - on the second layer
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement)
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elemenType={formElement.config.elemenType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispachToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(ContactData, axios));
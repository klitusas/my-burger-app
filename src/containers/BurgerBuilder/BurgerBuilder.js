import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrdersSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        /**
         * Redux case:
         * totalPrice, ingrediensts -> Checkout.js -> ...
         * I have removed 'ingredients' from the state therefore,
         * I have removed 'totalPrice' from the state therefore
        */

        /** 
         * This also is a UI state.
         * Maybe
        */
        // purchaseable: false,

        /**
         * local UI state - we use it to check if we show a modal, error.
         * Probably best to handle locally with 'state'
         * */
        purchasing: false,
        loading: false,
        error: false
    }
    /**
     *Good place to fetch 
     */
    componentDidMount() {
        // axios.get('https://react-burger-builder-1ecfe.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        //this.setState({ purchaseable: sum > 0 })
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        // const queryParams = [];
        // let ingredients = {
        //     bacon: 1,
        //     cheese: 2,
        //     salad: 1
        // }
        // for (let i in this.props.ings) {
            /**
             * encodeURIComponent encodes the element in such way 
             * that it can be used as in the url,
             * this is relevant for fixing white spaces and so on
             */
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price)
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout'
            // pathname: '/checkout',
            // search: '?' + queryString,
        );
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //sets true or false
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler} />
                </Aux>)
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
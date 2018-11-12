import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //could be functional component doesnt have to be  a class
    componentWillUpdate() {
        console.log('[OrderSummary]: Will Update')
    }

    render() {
        let ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>)
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: $ {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Proceed</Button>
            </Aux>
        )
    }
};

export default OrderSummary;
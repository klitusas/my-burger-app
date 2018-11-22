import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    /*  IMPORTANT: REMOVED BY REDUX */
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }
    /**
     * URLSearchParams we extract the params without '&, ?...'
     * componentDidMount => componentWillMount 
     * before we render the child component, we
     * already have access to the props there. So
     * we can setup the state prior to rendering the children
     */

    /*  IMPORTANT: REMOVED BY REDUX */
    // componentWillMount(){
    //         const query = new URLSearchParams(this.props.location.search);
    //         const ingredients = {};
    //         let price = 0;
    //         for(let param of query.entries()){
    //             if(param[0] === 'price') {
    //                 price = param[1];
    //             } else {
    //                 ingredients[param[0]] =+ param[1] // by adding plus i convert to number
    //             }
    //         }

    //         this.setState({ingredients: ingredients, totalPrice: price})
    //     }

    checkoutCancelled = () => {
        /* history api */
        console.log("back")
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                {/* Will use routing to really pass ingredients */}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelled}
                    onCheckoutContinued={this.checkoutContinued} />

                {/* to pass data to a component through route, example:
                <Route
                    path='{this.props.match.path + '/contact-data'}'
                    render={(props) => <ContactData {...props} isAuthed={true} />}
                /> */}

                {/* IMPORTANT: REPLACED BY REDUX */}
                {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData
                    ingredients={this.props.ings}
                    price={this.props.price}
                    {...props} />)} /> {
                        /* sending props to get history */} 


                {/* Will have to connect in ContactData */}
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
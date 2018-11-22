import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
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

    /**
     *  IMPORTANT: componentWillMount was too late
     * therefore we could not dispatch in here. Instead we moved
     * everything to the BurgerBuilder
     */
    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelled = () => {
        /* history api */
        console.log("back")
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        {/* Redirecting user: because if nothing is chosen
                there is no point being in the checkout CheckoutSummary */}
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.checkoutCancelled}
                        onCheckoutContinued={this.checkoutContinued} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>

            )
        }
        return summary;

        {/* Will use routing to really pass ingredients */ }
        {/* <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelled}
                    onCheckoutContinued={this.checkoutContinued} /> */}

        {/* to pass data to a component through route, example:
                <Route
                    path='{this.props.match.path + '/contact-data'}'
                    render={(props) => <ContactData {...props} isAuthed={true} />}
                /> */}

        {/* IMPORTANT: REPLACED BY REDUX */ }
        {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData
                    ingredients={this.props.ings}
                    price={this.props.price}
                    {...props} />)} /> {
                        /* sending props to get history */}


        {/* Will have to connect in ContactData */ }
        {/* <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} /> */}


    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

/**
 *  IMPORTANT: componentWillMount was too late
 * therefore we could not dispatch in here. Instead we moved
 * everything to the BurgerBuilder
 */
// const mapDispatchToProp = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);
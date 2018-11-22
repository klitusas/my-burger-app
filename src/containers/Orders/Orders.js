import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    /**
     * we can use component did mount here because we only
     * want to fethch orders when  this is loaded,
     * for example componentDidUpdate is not good here
     */

    //REDUX: redux claimed this
    // state = {
    //     orders: [],
    //     loading: true
    // }
    componentDidMount() {
        /** 
         * REDUX: redux claimed this fetch 
        axios.get('/orders.json')
            .then(res => {
                this.setState({loading: false})
                const fetchedOrders = [];

                /**
                 * by using ...res.data we are not pushing 
                 * res.data object we instead push a new object
                 * on to fetchedOrders array where we distribute the 
                 * properties of the the order object we fetched 
                 * from firebase with the spread operator, and add
                 * one new property 'id' which is the key.
                 *
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key], 
                        id: key})
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch( err => {
                this.setState({loading: false})
            })
            */

        this.props.onFetchOrders()
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                        // + makes it a number
                    ))
                }
        return (
            <div>
                { orders }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

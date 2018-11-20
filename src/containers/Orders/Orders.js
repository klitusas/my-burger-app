import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    /**
     * we can use component did mount here because we only
     * want to fethch orders when  this is loaded,
     * for example componentDidUpdate is not good here
     */
    state = {
        orders: [],
        loading: true
    }
    componentDidMount(){
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
                 */
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
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} /> 
                        // + makes it a number
                ))}
            </div>
        )  
    }
}

export default withErrorHandler(Orders, axios);

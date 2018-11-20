import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';

const AsyncCheckout = asyncComponent(() => {
  /**
   * Whatever comes between the parethesis 
   * is only imported when this funtion is executed
   * and that function here will only be executed 
   * once we render the function AsyncCheckout to the screen.
   * 
   * AsyncCheckout wasnt added to the main bundle, instead
   * it was prepared to load when needed when we include AsyncCheckout
   * which we only do when we navigate to "/checkout"
   */
  return import('./containers/Checkout/Checkout');
});
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {/* LAZY LOADING/CODE SPLITTING: 
            THSE 3 COMPONENTS SHOULD ONLY BE LOADED ONCE THE USER CLICKS ON THE LINK
            OTHERWISE NEW POST AND ALL THE POTENTIAL CHILDREN ARE NEVER NEEDED
            FOR TINY APPLICATION IS NOT VERY USEFULL. */}
            <Route path="/checkout" component={ AsyncCheckout } />
            <Route path="/orders"  component={ Orders } />
            <Route path="/" exact component={ BurgerBuilder } />
          </Switch> 
        </Layout>
      </div>
    );
  }
}

export default App;

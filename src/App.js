import React, { Component } from 'react';

//Fixing the problem with connect breaking the app
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';

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
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  /**
   * Route protection with guards
   *
   */
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>

          {/* LAZY LOADING/CODE SPLITTING: 
            THSE 3 COMPONENTS SHOULD ONLY BE LOADED ONCE THE USER CLICKS ON THE LINK
            OTHERWISE NEW POST AND ALL THE POTENTIAL CHILDREN ARE NEVER NEEDED
            FOR TINY APPLICATION IS NOT VERY USEFULL. */}

            {routes}

        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

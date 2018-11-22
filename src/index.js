import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'; //middleware
import orderReducer from './store/reducers/order'

/* Wrap everything in the router component,
this is a good place to wrap everything (culd be as well App.js) */


/**
 * PLEASE SEE THE TUTORIAL ON LAZY LOADING IMPLEMENTATION
 * USING THE HIGHER ORDER FUNCTION, PROMISE
 */

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState())
            return result;
        }
    }
};

//redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//combining reducers
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, logger)
));

const app = (
    /* connect the store with redux with our app */
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

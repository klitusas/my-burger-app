/** 
 * ACTION CREATORS
*/

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

/** 
 * syncronous action creator - will be dispatched 
 * once async is done
 */
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

//error
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // syntax available due to redux thunk
    return dispatch => {
        axios.get('https://react-burger-builder-1ecfe.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
};


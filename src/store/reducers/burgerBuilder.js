import * as actionTypes from '../actions/actionTypes';
import { UpdateObject, updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

/** 
 * Improving with utility function and 
 * extracting logic from our cases into
 * their own logic
 * OPTIONAL
*/

const addIngredient = (state, action) => {
    /** 
     * es6 - dynamically overiding property
     * in a given js object, we target one specific key
     * with the [action.ingredientName] syntax
    */
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state, action) => {
    /** 
     * es6 - dynamically overiding property
     * in a given js object, we target one specific key
     * with the [action.ingredientName] syntax
    */
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }
}

export default reducer;

import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    /** 
                     * es6 - dynamically overiding property
                     * in a given js object, we target one specific key
                     * with the [action.ingredientName] syntax
                    */
                    
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    /** 
                     * es6 - dynamically overiding property
                     * in a given js object, we target one specific key
                     * with the [action.ingredientName] syntax
                    */                    
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        default: 
            return state;
    }
}

export default reducer;

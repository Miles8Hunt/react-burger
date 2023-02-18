import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, OPEN_INGREDIENT_INFO } from '../actions/burgerIngredients';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
const initialState = {
  ingredients: [],
  
  currentIngredient: null,
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false
      }
    case OPEN_INGREDIENT_INFO:
      return {
        ...state,
        currentIngredient: action.payload
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    default:
      return state;
  };
};

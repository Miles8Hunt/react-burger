import { SET_MODAL, RESET_MODAL } from '../actions/ingredientDetails';

const initialState = {
  selectedIngredient: null,    
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_MODAL:
      return {
        ...state,
        selectedIngredient: action.payload
      }
    case RESET_MODAL:
      return {
        ...state,
        selectedIngredient: null
      }
    default:
      return state;
  };
};

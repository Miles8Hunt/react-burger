import { SET_MODAL, RESET_MODAL } from '../actions/ingredientDetails';
import { IIngredient, TIngredientDetailsActions } from '../types/types';


export type TIngredientDetailsState = {
  selectedIngredient: IIngredient | number | null;  
};

const initialState: TIngredientDetailsState = {
  selectedIngredient: null,    
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
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

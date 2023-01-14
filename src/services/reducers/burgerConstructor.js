import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from '../actions/burgerConstructor';
  
const initialState = {
  bun: false, 
  ingredients: [],
};
  
export const burgerConstructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case CONSTRUCTOR_ADD:
      if(action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        }
      } 
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      } 
      case CONSTRUCTOR_DELETE:
        return {
          ...state,
          ingredients: [...state.ingredients.filter((item) => item.key !== action.payload)],
        }
      case CONSTRUCTOR_RESET:
        return {
          bun: false, 
          ingredients: []
        }
      case CONSTRUCTOR_REORDER:
        const ingredients = [...state.ingredients]
        ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0])
        return {
          ...state,
          ingredients: ingredients
        }
      default:
        return state;
  };
};

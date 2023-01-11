import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';

export const rootReducer = combineReducers({
  burgerIngredientsReducer, 
  burgerConstructorReducer, 
  ingredientDetailsReducer, 
  orderDetailsReducer
});

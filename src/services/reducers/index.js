import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { modalReducer } from './modal';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';
import { userRequestReducer } from './user';
import { registerUserReducer } from './register';
import { forgotPasswordReducer } from './forgorPassword';
import { resetPasswordReducer } from './resetPassword';


export const rootReducer = combineReducers({
  burgerIngredientsReducer, 
  burgerConstructorReducer,
  modalReducer, 
  ingredientDetailsReducer, 
  orderDetailsReducer,
  userRequestReducer,
  registerUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer
});

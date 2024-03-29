import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderDetailsReducer } from './orderDetails';
import { userRequestReducer } from './user';
import { registerUserReducer } from './register';
import { forgotPasswordReducer } from './forgotPassword';
import { resetPasswordReducer } from './resetPassword';
import { wsReducer } from './webSockets'


export const rootReducer = combineReducers({
  burgerIngredientsReducer, 
  burgerConstructorReducer,
  ingredientDetailsReducer, 
  orderDetailsReducer,
  userRequestReducer,
  registerUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  wsReducer
});

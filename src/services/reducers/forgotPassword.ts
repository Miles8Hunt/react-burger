import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from '../actions/forgotPassword';
import { TForgotPasswordActions } from '../types/types';


export type TForgotPasswordState = {
  forgotPasswordRequest: boolean;
  forgotPasswordRequestFailed: boolean;
  email: boolean;
  forgotPasswordSuccess: Boolean;
}

const initialState: TForgotPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  email: false,
  forgotPasswordSuccess: false
};

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): TForgotPasswordState => {
  switch(action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordRequestFailed: false,

      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
          forgotPasswordRequest: false,
          email: action.payload,
          forgotPasswordSuccess: true,
        }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordRequestFailed: true,
      } 
    default:
      return state
  }
};

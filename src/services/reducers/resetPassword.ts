import { RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from '../actions/reserPassword';
import { TResetPasswordActions } from '../types/types';


export type TResetPasswordState = {
  resetPasswordRequest: boolean;
  resetPasswordRequestFailed: boolean;
};

const initialState: TResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordRequestFailed: false,
};

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions): TResetPasswordState => {
  switch(action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordRequestFailed: false,

      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: true,
      } 
    default:
      return state
  }
};

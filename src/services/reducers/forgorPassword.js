import { FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED } from '../actions/forgotPassword';


const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordRequestFailed: false,
  email: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
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



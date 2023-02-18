import {   
  AUTH_CHECKED
} from '../actions/user';

import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../actions/logOut';


const initialState = {
  isAuthChecked: false,
  userInfo: null,
  logoutRequest: false,
  logoutRequestFailed: false,
};

export const logOutReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGOUT:
          return {
              ...state,
              logoutRequest: true,
              logoutRequestFailed: false,
          }
      case LOGOUT_SUCCESS:
          return {
              ...state,
              logoutRequest: true,
              userInfo: null,
              isAuthChecked: false,
          }
      case LOGOUT_FAILED:
          return {
              ...state,
              logoutRequest: false,
              logoutRequestFailed: true,
              isAuthChecked: false,
          }
          case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true,
            }
          default:
          return state
  }
};

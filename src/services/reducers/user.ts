import {  AUTH_CHECKED, LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILED,} from '../actions/user';
import { TUserActions } from '../types/types';


export type TUserState = {
  registrationRequest: boolean;
  registrationRequestFailed: boolean;
  loginRequest: boolean;
  loginRequestFailed: boolean;
  getUserRequest: boolean;
  getUserRequestFailed: boolean;
  updateUserRequest: boolean;
  updateUserRequestFailed: boolean;
  logoutRequest: boolean;
  logoutRequestFailed: boolean;
  isAuthChecked: boolean;
  userInfo: {
      email: string;
      password: string;
      name: string;
  } | any;
};


const initialState: TUserState = {
  registrationRequest: false,
  registrationRequestFailed: false,
  loginRequest: false,
  loginRequestFailed: false,
  getUserRequest: false,
  getUserRequestFailed: false,
  updateUserRequest: false,
  updateUserRequestFailed: false,
  logoutRequest: false,
  logoutRequestFailed: false,
  isAuthChecked: false,
  userInfo: null,
};

export const userRequestReducer = (state = initialState, action: TUserActions): TUserState => {
  switch(action.type) {
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      }
    case LOGIN: 
      return {
        ...state,
        loginRequest: true,
        loginRequestFailed: false,
        isAuthChecked: false,
      }
    case LOGIN_SUCCESS: 
      return {
        ...state,
        loginRequest: true,
        userInfo: {
          email: action.payload.email,
          name: action.payload.name,
          password: '',
        },
        isAuthChecked: true,
      }
    case LOGIN_FAILED: 
      return {
        ...state,
        loginRequest: false,
        loginRequestFailed: true,
        isAuthChecked: false,
      }
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
    case GET_USER:
      return {
        ...state,
        getUserRequest: true,
        getUserRequestFailed: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        userInfo: {
          email: action.payload.email,
          name: action.payload.name,
          password: '',
      },
      }
    case GET_USER_FAILED: 
      return {
        ...state,
        getUserRequest: false,
        getUserRequestFailed: true,
      }
    case UPDATE_USER_DATA:
      return {
        ...state,
        updateUserRequest: true,
        updateUserRequestFailed: false,
      }
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        updateUserRequest: false,
        userInfo: {
          email: action.payload.email,
          name: action.payload.name,
          password: '',
        },
      }
    case UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        updateUserRequest: false,
        updateUserRequestFailed: true,
      }
    default:
      return state
  }
};

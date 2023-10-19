import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/register";
import { TRegistrationActions } from '../types/types';


export type TRegisterUserState = {
  registrationRequest: boolean;
  registrationFailed: boolean;
  isAuthChecked: boolean;
  user: {
    email: string;
    name: string;
    password: string;
  } | null;
}

const initialState: TRegisterUserState = {
  registrationRequest: false,
  registrationFailed: false,
  isAuthChecked: false,
  user: null,
}

export const registerUserReducer = (state = initialState, action: TRegistrationActions): TRegisterUserState => {

  switch (action.type) {

    case REGISTER: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
        isAuthChecked: false
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        user: {
          email: action.payload.email,
          name: action.payload.name,
          password: '',
        },
        isAuthChecked: true
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
        isAuthChecked: false
      };
    }
    default: {
      return state
    }
  }
}

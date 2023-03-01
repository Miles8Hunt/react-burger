import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILED } from "../actions/register";

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  user: null,
  isAuthChecked: false,
}

export const registerUserReducer = (state = initialState, action) => {

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
        user: action.payload,
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

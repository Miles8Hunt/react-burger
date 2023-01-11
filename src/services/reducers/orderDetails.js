import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/orderDetails';

const initialState = {
  orderNumber: '',
  orderRequest: false,
  orderNumberReceiveFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderNumberReceiveFailed: false
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false
      }
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderNumberReceiveFailed: true
      }
    default:
      return state;
  };
};

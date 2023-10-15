import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/orderDetails';
import { IOrder, TOrderDetailsActions } from '../types/types';


export type TOrderState = {
  orderNumber: IOrder | any;
  orderRequest: boolean;
  orderNumberReceiveFailed: boolean;
  isFetching: boolean;
};

const initialState: TOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderNumberReceiveFailed: false,
  isFetching: false
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderState => {
  switch(action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderNumberReceiveFailed: false,
        isFetching: true
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
        isFetching: false
      }
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderNumberReceiveFailed: true,
        isFetching: false
      }
    default:
      return state;
  };
};

import { BASE_URL, request } from '../../utils/api';
import { CONSTRUCTOR_RESET } from './burgerConstructor';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const getOrderNumber = (constructor, accessToken, setModalData) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    request(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken,
      },
      body: JSON.stringify(constructor)
    })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.order
          });

          setModalData(res.order.number)

          dispatch({
            type: CONSTRUCTOR_RESET
          })

        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(
        dispatch({
          type: GET_ORDER_FAILED,
        })
      );
  };
}

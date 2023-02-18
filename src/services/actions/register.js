import { BASE_URL, request } from '../../utils/api';


export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const registerUserRequest = (form) => {
  return dispatch => {
      dispatch({
          type: REGISTER
      })
      request(`${BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
              "Content-type": 'application/json'
          },
          body: JSON.stringify(form)
      })
      .then(res => {
          if(res.success) {
              dispatch({
                  type: REGISTER_SUCCESS,
                  payload: res.user
              });

              localStorage.setItem('refreshToken', res.refreshToken)
          }
      })
      .catch((err) => {
          console.log(`Ошибка запроса ${err}`)
          dispatch({
              type: REGISTER_FAILED
          });
      });
  }
};

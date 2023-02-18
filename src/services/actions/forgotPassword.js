import { BASE_URL, request } from '../../utils/api';


export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const forgotPasswordRequest = (form, redirect) => {
  return function(dispatch) {
      dispatch({
          type: FORGOT_PASSWORD
      });

      request(`${BASE_URL}/password-reset`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              "Content-type": 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(form)
      })
      .then(res => {
          if(res.success) { 
              console.log(res) 
              dispatch({
                  type: FORGOT_PASSWORD_SUCCESS,
                  payload: res.success
              });
              redirect();
          }
      })
      .catch((err) => {
          dispatch({
              type: FORGOT_PASSWORD_FAILED,
          });
          console.log(`Ошибка запроса ${err}`)
      })
  }
};

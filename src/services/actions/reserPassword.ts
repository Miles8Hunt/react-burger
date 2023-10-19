import { BASE_URL, request } from '../../utils/api';
import { AppDispatch, IInputData } from '../types/types';


export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const resetPasswordRequest = (form: IInputData) => (dispatch: AppDispatch) => {
  dispatch({
    type: RESET_PASSWORD
  })

  request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(res => {
    if(res.success) {
      console.log(res)
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        //payload: res.success
      }) 
      //redirect();
    }
  })
  .catch((err) => {
    dispatch({
      type: RESET_PASSWORD_FAILED
    }) 
    console.log(`Ошибка запроса ${err}`)
  })
};

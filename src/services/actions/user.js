import { BASE_URL, request, getUserApi } from '../../utils/api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';


export const AUTH_CHECKED = 'AUTH_CHECKED';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';


export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER
  })
  return getUserApi()
  .then(res => {
    if(res.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user
      })
    }
  })
  .catch((err) => {
    dispatch({
      type: GET_USER_FAILED
    })
    err.message && console.log(`Ошибка запроса ${err.message}`)
    !err.message && console.log(err)
  })
};

export const checkAuth = () => (dispatch) => {
  if(getCookie('accessToken')) {
    dispatch(getUser())
      .then(() => {
        dispatch ({
          type: AUTH_CHECKED
        })
      })
  } else {
    dispatch ({
      type: AUTH_CHECKED
    })
  }
};

export const logInRequest = (form) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN
    });
    request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { "Content-type": 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => {
      if(res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user
      });
        setCookie('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
      }
    })
    .catch((err) => {
      console.log(`Ошибка запроса ${err}`);
      dispatch({
        type: LOGIN_FAILED
      });
    })
  }
};

export const logOutRequest = (refreshToken) => {
  return function(dispatch){
    dispatch({
      type: LOGOUT
    })
    request(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { "Content-type": 'application/json' },
      body: JSON.stringify({ "token": refreshToken })
    })
    .then(res => {
      if(res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        })
        localStorage.removeItem('refreshToken')
        deleteCookie('accessToken')
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILED
      }) 
      console.log(`Ошибка запроса ${err}`)
    })
  }
};

export const updateUserData = (accessToken, name, email, password) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_DATA
    })
    request(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        "Content-type": 'application/json',
        "Authorization": accessToken,
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    })
    .then(res => {
      if(res.success) {
        dispatch({
          type: UPDATE_USER_DATA_SUCCESS,
          payload: res.user
        })
      }
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_DATA_FAILED
      })
      console.log(`Ошибка запроса ${err}`)
    })
  }
};

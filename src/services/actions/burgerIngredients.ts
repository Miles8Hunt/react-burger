import { BASE_URL, request } from '../../utils/api';

import { AppDispatch } from '../types/types';
import { IIngredient } from '../types/types';
import { IOpenIngredientInfo } from '../types/types';


export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const OPEN_INGREDIENT_INFO = 'OPEN_INGREDIENT_INFO';


export const currentIngredient = (ingredient: IIngredient | undefined): IOpenIngredientInfo => ({ type: OPEN_INGREDIENT_INFO, payload: ingredient });

export const getIngredients = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    request(`${BASE_URL}/ingredients`)
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          });
        } else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
    .catch(() => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
          })
    })
  }      
};

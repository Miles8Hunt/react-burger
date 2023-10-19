import { getCookie, setCookie } from './cookies';


const BASE_URL = 'https://norma.nomoreparties.space/api';
const WS_URL = 'wss://norma.nomoreparties.space/orders';

function parseResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

// универсальная функция запроса с проверкой ответа
function request(url: string, options?: any) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(parseResponse)
}

export const refreshToken = () => {

  return request(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
          "Content-type": 'application/json'
      },
      body: JSON.stringify({
          token: localStorage.getItem('refreshToken')})
  })
  .then(refreshData => {
      if(!refreshData.success) {
          Promise.reject(refreshData)
      }

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken)

  })
};

const fetchWithRefresh = async (url: string, options?: any) => {
  try {
      const res = await fetch(url, options);
      return await parseResponse(res); 
  } catch (error: any) {
      if (error.message === 'jwt expired') {
          const refreshData: any = await refreshToken();

          options.headers.Authorization = refreshData.accessToken;

          const res = await fetch(url, options);
          return await parseResponse(res); 
      } else {
          return Promise.reject(error);
      }
  }
};

const getUserApi = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
      headers: {
          "Authorization": getCookie('accessToken'),
      },
  })
};


export { BASE_URL, WS_URL, request, getUserApi, parseResponse }

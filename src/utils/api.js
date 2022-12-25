
const BASE_URL = 'https://norma.nomoreparties.space/api';

function parseResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

// универсальная функция запроса с проверкой ответа
function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(parseResponse)
}

const getIngredients = (setData) => {
  request(`${BASE_URL}/ingredients`, setData)
  .then(json => setData(json.data))
  .catch((error) => {
    console.log(`Ошибка - ${error}`);
  })  
}

const getOrderNumber = (constructor, setModalData) => {
  fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
     "Content-type": 'application/json'
    },
    body: JSON.stringify(constructor)
  })
  .then(res => parseResponse(res))
  .then(data => {
    setModalData(data);
  })
  .catch((error) => {
    console.log(`Ошибка - ${error}`);
  })
}

export { getIngredients, getOrderNumber }

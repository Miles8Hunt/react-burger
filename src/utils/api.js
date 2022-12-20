
const api = 'https://norma.nomoreparties.space/api/ingredients';
const order = 'https://norma.nomoreparties.space/api/orders';

function parseResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const getIngredients = (setData) => {
  fetch(api)
  .then(res => parseResponse(res))
  .then(json => setData(json.data))
  .catch((error) => {
    console.log(`Ошибка - ${error}`);
  })  
}

const getOrderNumber = (constructor, setModalData) => {
  fetch(order, {
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
}

export { getIngredients, getOrderNumber }

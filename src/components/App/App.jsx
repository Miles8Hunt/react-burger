import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';

function App() {

  const api = 'https://norma.nomoreparties.space/api/ingredients';

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(api)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(json => setData(json.data))
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      })  
  }, []);

  return (
    <div className={styles.page}>  
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstuctor ingredients={data} />
      </main>
    </div>
  )
};

export default App;

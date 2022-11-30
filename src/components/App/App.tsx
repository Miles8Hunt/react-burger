import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className={styles.page}>  
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstuctor />
      </main>
    </div>
  )
};

export default App;
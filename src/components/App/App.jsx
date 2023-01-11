import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
      dispatch(getIngredients()); 
  }, []);

  return (
    <div className={styles.page}>  
      <AppHeader />
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstuctor />
            </DndProvider>
          </main>
    </div>
  )
};

export default App;

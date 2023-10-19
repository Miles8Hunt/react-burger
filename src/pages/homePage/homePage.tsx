import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../../components/BurgerConstructor/BurgerConstructor';
import styles from './App.module.css';
import { Outlet } from "react-router-dom";
import { FC } from 'react';


const HomePage: FC = () => {

  return (
    <>
      <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstuctor />
          </DndProvider>
      </main>
    <Outlet />
    </>
  )
}


export default HomePage

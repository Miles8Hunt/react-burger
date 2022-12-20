import React from 'react';
import styles from './App.module.css';
import { getIngredients } from '../../utils/api';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';
import IngredientsContext from '../../services/ingredientContext';
import ConstructorContext from '../../services/constructorContext';


function App() {

  const initialState = {
    bun: [], 
    main: []
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case "add":
        if(action.payload.type === 'bun') {
          return {
            ...state,
            bun: action.payload,
          };
        }
        return {
          ...state,
          main: [...state.main, action.payload]
        }
      default:
        return {...state} 
    }
  }
  
  const [constructorState, constructorDispatch] = React.useReducer(reducer, initialState);

  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    getIngredients(setData)  
  }, []);

  return (
    <div className={styles.page}>  
      <AppHeader />
      <IngredientsContext.Provider value={data}>
        <ConstructorContext.Provider value={{constructorState, constructorDispatch}}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstuctor />
          </main>
        </ConstructorContext.Provider> 
      </IngredientsContext.Provider>
    </div>
  )
};

export default App;

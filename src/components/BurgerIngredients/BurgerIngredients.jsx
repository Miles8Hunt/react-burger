import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsContext from '../../services/ingredientContext';
import IngredientsItem from '../IngredientsItem/IngredientsItem';


function BurgerIngredients() {

  const ingredients = React.useContext(IngredientsContext);

  const [current, setCurrent] = React.useState('one');

  const bun = React.useRef(null);
  const sauce = React.useRef(null);
  const main = React.useRef(null);

  const bunScroll = (id) => {
    setCurrent(id);
    bun.current.scrollIntoView({ behavior: "smooth" })
  }
  const sauceScroll = (id) => {
    setCurrent(id);
    sauce.current.scrollIntoView({ behavior: "smooth" })
  } 
  const mainScroll = (id) => {
    setCurrent(id);
    main.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={`${styles.section} mr-10`}>

      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={styles.switcher}>
        <Tab value="one" active={current === 'one'} onClick={bunScroll}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={sauceScroll}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={mainScroll}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredients}>
        <h2 ref={bun} className="text text_type_main-medium">Булки</h2> 
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'bun')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} />   
              )
            })
          }
        </ul>

        <h2 ref={sauce} className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'sauce')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} /> 
              )
            })
          }
        </ul>

        <h2 ref={main} className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}> 
          {
            ingredients.map((ingredient) => {
              if(ingredient.type === 'main')
              return (
                <IngredientsItem key={ingredient._id} ingredient={ingredient} /> 
              ) 
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients

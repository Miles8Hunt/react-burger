import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import PropTypes from 'prop-types';
import ingredientsType from '../../utils/types';


function BurgerIngredients({ ingredients }) {

  const [current, setCurrent] = React.useState('one')

  const handlerScroll = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={`${styles.section} mr-10`}>

      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={styles.switcher}>
        <Tab value="one" active={current === 'one'} onClick={handlerScroll}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={handlerScroll}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={handlerScroll}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredients}>
        <h2 id="one" className="text text_type_main-medium">Булки</h2> 
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

        <h2 id="two" className="text text_type_main-medium">Соусы</h2>
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

        <h2 id="three" className="text text_type_main-medium">Начинки</h2>
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsType).isRequired,
};

export default BurgerIngredients

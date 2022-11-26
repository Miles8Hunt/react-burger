import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredients from '../utils/data.js';


function BurgerIngredients() {

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
                <li className={styles.item} key={ingredient._id}>
                  <Counter count={1} size="default" />
                  <img src={ingredient.image} alt={ingredient.name}></img>
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
                </li>
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
                <li className={styles.item} key={ingredient._id}>
                  <Counter count={1} size="default" />
                  <img src={ingredient.image} alt={ingredient.name}></img>
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
                </li>
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
                <li className={styles.item} key={ingredient._id}>
                  <Counter count={1} size="default" />
                  <img src={ingredient.image} alt={ingredient.name}></img>
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
                </li>
              ) 
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients
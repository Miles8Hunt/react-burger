import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import bun01 from '../../images/bun-01.svg';
import ingredients from '../utils/data.js';

function BurgerConstructor() {
  return (
    <section className={`${styles.section} mt-25 pl-6`}>
      <div className={styles.list}>
        <div className={styles.bun}>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            thumbnail={bun01}
            price={20}
            type="top"
            isLocked={true}
          />
        </div>
        
        <ul className={`${styles.innerList} mt-4 mb-4`}>
          {
            ingredients.map((ingredient) => {
              if(ingredient.type !== 'bun') {
                return (
                  <li className={`${styles.item} mb-4`} key={ingredient._id}>
                    <div className={styles.dragIcon}>
                      <DragIcon type="primary" />
                    </div>                                        
                    <ConstructorElement
                      text={ingredient.name}
                      thumbnail={ingredient.image_mobile}
                      price={ingredient.price}
                    />
                  </li>
                )
              }
            })
          }
        </ul>  

        <div className={styles.bun}>                           
          <ConstructorElement
            text="Краторная булка N-200i (низ)"
            thumbnail={bun01}
            price={20}
            type="bottom"
            isLocked={true}
          />
        </div>
      </div>
            
      <div className={`${styles.total} mt-10 mr-1`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <div className={styles.currencyIcon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="large" htmlType='button'>Оформить заказ</Button>
      </div> 
    </section>
  )
}

export default BurgerConstructor
import styles from './BurgerDetailsItem.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import { IBurgerDetailsItem } from '../../services/types/types';


const BurgerDetailsItem: FC<IBurgerDetailsItem> = ({ ingredient, counter }) => {

  return (
    <li className={styles.main}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name}
          />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </div>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{`${counter} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}


export default BurgerDetailsItem

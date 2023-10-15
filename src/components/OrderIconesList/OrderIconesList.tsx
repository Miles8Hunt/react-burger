import styles from './OrderIconesList.module.css';
import OrderIngredientIcon from '../OrderIngredientIcon/OrderIngredientIcon';
import { FC } from 'react';
import { IOrderIconesList } from '../../services/types/types';


const OrderIconesList: FC<IOrderIconesList> = ({ ingredients }) => {

  function showMore() {
    if (ingredients.length - 6 === 0) {
      return false
    } return true;
  }

  return (
    <ul className={styles.list}>
      {ingredients.map((el, index) => {
        if (index === 5) {
          return (
            <OrderIngredientIcon
              length={ingredients.length}
              ingredient={el}
              showMore={showMore()}
              index={index}
              key={index}
            />
          )
        } else if (index < 5) {
          return (
            <OrderIngredientIcon
              length={ingredients.length}
              ingredient={el}
              showMore={false}
              index={index}
              key={index}
            />
          )
        }
      })
      }
    </ul>
  )
}


export default OrderIconesList

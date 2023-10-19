import styles from './OrderIngredientIcon.module.css';
import { FC } from "react";
import { IOrderIngredientIcon } from "../../services/types/types";


const OrderIngredientIcon: FC<IOrderIngredientIcon> = ({ length, ingredient, showMore, index }) => {

  return (
    <li className={styles.item} style={{ zIndex: 20 - index }}> 
      <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
      {showMore && (
        <p className={`${styles.text} text text_type_digits-default`}>{`+${length - 6}`}</p>
      )}
    </li>
  )
}


export default OrderIngredientIcon

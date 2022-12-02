import styles from './IngredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientsType from '../../utils/types';


function IngredientDetails({ ingredient, closeModal }) {

  return (
    <div className={styles.content}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h1>
      <img src={ingredient.image_large}></img>
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul className={`${styles.detailsbox} mb-15`}>
        <li className={styles.details}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li className={styles.details}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li className={styles.details}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li className={styles.details}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
      <div className={styles.closeIcon} > 
        <CloseIcon type="primary" onClick={closeModal} />
      </div>
    </div>
  )
};

IngredientDetails.propTypes = {
  ingredient: ingredientsType.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default IngredientDetails
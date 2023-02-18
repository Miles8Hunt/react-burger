import styles from './IngredientDetails.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ingredientsType from '../../utils/types';


function IngredientDetails({ ingredient }) {

  const currentIngredient = useSelector((state) => state.burgerIngredientsReducer.currentIngredient);
  let id = currentIngredient._id;

  return (
    <div className={styles.content}>
      <Link className={`${styles.link} text text_type_main-large mt-15`} to={`/ingredients/${id}`} >Детали ингредиента</Link>
      <img src={ingredient.image_large} alt={ingredient.name}></img>
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
    </div>
  )
};

IngredientDetails.propTypes = {
  ingredient: ingredientsType.isRequired,
};

export default IngredientDetails

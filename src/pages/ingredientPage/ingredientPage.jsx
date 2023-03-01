import styles from './ingredientPage.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const IngredientPage = () => {

  const ingredients = useSelector((state) => state.burgerIngredientsReducer.ingredients);
  const { id }  = useParams();
  const ingredient = ingredients.find((el) => el._id === id);

  return  (
    ingredient && (
      <div className={styles.container}>
        <IngredientDetails />
      </div>
    )
  )
};

export default IngredientPage

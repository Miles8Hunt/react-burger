import styles from './ingredientPage.module.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const IngredientPage = () => {

  const ingredients = useSelector((state) => state.burgerIngredientsReducer.ingredients);
  let { id }  = useParams();
  const ingredient = ingredients.find((el) => el._id === id);

  return  (
    ingredient && (
      <>
        <AppHeader />
        <div className={styles.container}>
          <IngredientDetails />
        </div>
      </>
    )
  )
};

export default IngredientPage

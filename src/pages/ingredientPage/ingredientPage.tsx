import styles from './ingredientPage.module.css';
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { useSelector } from '../../services/types/types';


const IngredientPage: FC = () => {

  const ingredients = useSelector((state) => state.burgerIngredientsReducer.ingredients);
  const { id }  = useParams();
  const ingredient = ingredients.find((el) => el._id === id);

  return  (
    <>
      {
        ingredient && (
          <div className={styles.container}>
            <IngredientDetails />
          </div>
        )
      }
    </>
  )
};


export default IngredientPage

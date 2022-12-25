import React from 'react';
import styles from './IngredientsItem.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorContext from '../../services/constructorContext'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ingredientsType from '../../utils/types';


function IngredientsItem({ ingredient }) {

  const { constructorDispatch } = React.useContext(ConstructorContext);

  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = React.useState(false);

  function openModal() {
    setIngredientDetailsOpen(true);
    constructorDispatch({
      type: "add",
      payload: ingredient
    })
  }
  
  function closeModal () {
    setIngredientDetailsOpen(false);
  }

  return(
    <>
      <li className={styles.item} key={ingredient._id} onClick={openModal}>
        <Counter count={1} size="default" />
        <img src={ingredient.image} alt={ingredient.name}></img>
        <div className={`${styles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      </li>

      {isIngredientDetailsOpen &&
        <Modal closeModal={closeModal}>
          <IngredientDetails
            closeModal={closeModal}      
            ingredient={ingredient}
          />
        </Modal> 
      } 
    </>   
  )
}

IngredientsItem.propTypes = {
  ingredient: ingredientsType.isRequired
};

export default IngredientsItem

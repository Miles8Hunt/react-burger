import React from 'react';
import styles from './IngredientsItem.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ingredientsType from '../../utils/types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
// import { CONSTRUCTOR_ADD } from '../../services/actions/burgerConstructor';
import { RESET_MODAL, SET_MODAL } from '../../services/actions/ingredientDetails';
import { useDrag } from 'react-dnd';


function IngredientsItem({ ingredient }) {

  const dispatch = useDispatch();
  
  const addedIngredients = useSelector(state => state.burgerConstructorReducer);
  const selectedIngredient = useSelector(state => state.ingredientDetailsReducer.selectedIngredient);

  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = React.useState(false);

  function openModal() {
    // dispatch({ type: CONSTRUCTOR_ADD, payload: ingredient });
    dispatch({ type: SET_MODAL, payload: ingredient });
    setIngredientDetailsOpen(true);
  };
  
  function closeModal () {
    dispatch({ type: RESET_MODAL});
    setIngredientDetailsOpen(false);
  };

  const counter = React.useMemo(() => {
    if (addedIngredients.bun === null) return 0;
    return ingredient.type === "bun" && ingredient._id === addedIngredients.bun._id
      ? 2
      : addedIngredients.ingredients.filter((item) => item._id === ingredient._id).length;
    }, [addedIngredients.ingredients, addedIngredients.bun, ingredient]
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: monitor => ({
       opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return(
    <>

      <li className={styles.item} ref={dragRef} key={ingredient._id} onClick={openModal}>
        {counter > 0 && <Counter count={counter} size={"default"} />}
        <img src={ingredient.image} alt={ingredient.name} style={{opacity}}></img>
        <div className={`${styles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      </li>

      {isIngredientDetailsOpen && selectedIngredient && 
        <Modal closeModal={closeModal}>
          <IngredientDetails     
            ingredient={selectedIngredient}
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

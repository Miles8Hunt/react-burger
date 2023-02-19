import React from 'react';
import styles from './IngredientsItem.module.css';
import ingredientsType from '../../utils/types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { currentIngredient } from "../../services/actions/burgerIngredients";
import { ingredientModalStatus } from "../../services/actions/modal";
import { Link, Outlet, useLocation } from "react-router-dom";


function IngredientsItem({ ingredient }) {

  const dispatch = useDispatch();
  const location = useLocation();
  
  const addedIngredients = useSelector(state => state.burgerConstructorReducer);
  const burgerData = useSelector(state => state.burgerIngredientsReducer.ingredients);

  const openIngredientDetails = (e) => {
    const id = e.currentTarget.id
    const current = burgerData.find(element => element._id === id)
    dispatch(currentIngredient(current));
    dispatch(ingredientModalStatus(true));
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
      <li className={styles.item} ref={dragRef} key={ingredient._id} id={ingredient._id} onClick={openIngredientDetails}>
        {counter > 0 && <Counter count={counter} size={"default"} />}
        <Link to={`/ingredients/${ingredient._id}`} state={{ background: location }}>
          <img src={ingredient.image} alt={ingredient.name} style={{opacity}}></img>
        <Outlet />
        </Link>
        <div className={`${styles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      </li>
    </>   
  )
}

IngredientsItem.propTypes = {
  ingredient: ingredientsType.isRequired
};

export default IngredientsItem

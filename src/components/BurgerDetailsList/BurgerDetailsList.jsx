import styles from './BurgerDetailsList.module.css';
import BurgerDetailsItem from "../BurgerDetailsItem/BurgerDetailsItem";
import PropTypes from 'prop-types';


export function BurgerDetailsList({ ingredients }) {

  function counter(ingredient) {
    let counter = 0;
    ingredients.forEach((el) => {
      if (el._id === ingredient._id) {
        counter += 1;
      }
    })
    return counter;
  }

  return (
    <div className={styles.container}>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <ul className={styles.list}>
        {ingredients.map((ingredient, index) => {
          return (
            <BurgerDetailsItem counter={counter(ingredient)} ingredient={ingredient} key={index} />
          )
        })}
      </ul>
    </div>
  );
}

BurgerDetailsList.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default BurgerDetailsList

import styles from './OrderIconesList.module.css';
import OrderIngredientIcon from '../OrderIngredientIcon/OrderIngredientIcon';
import PropTypes from 'prop-types';


function OrderIconesList({ ingredients }) {

  function showMore() {
    if (ingredients.length - 6 === 0) {
      return false
    } return true;
  }

  return (
    <ul className={styles.list}>
      {ingredients.map((el, index) => {
        if (index === 5) {
          return (
            <OrderIngredientIcon
              length={ingredients.length}
              ingredient={el}
              showMore={showMore()}
              index={index}
              key={index}
            />
          )
        } else if (index < 5) {
          return (
            <OrderIngredientIcon
              length={ingredients.length}
              ingredient={el}
              showMore={false}
              index={index}
              key={index}
            />
          )
        }
      })
      }
    </ul>
  )
}

OrderIconesList.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default OrderIconesList

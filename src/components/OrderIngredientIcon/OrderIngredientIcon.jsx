import styles from './OrderIngredientIcon.module.css';
import PropTypes from 'prop-types';
import IngredientPropTypes from '../../utils/types';


function OrderIngredientIcon({ length, ingredient, showMore, index }) {

  return (
    <li className={styles.item} style={{ zIndex: 20 - index }}> 
      <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
      {showMore && (
        <p className={`${styles.text} text text_type_digits-default`}>{`+${length - 6}`}</p>
      )}
    </li>
  )
}

OrderIngredientIcon.propTypes = {
  ingredient: IngredientPropTypes,
  index: PropTypes.number.isRequired,
  showMore: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired
}

export default OrderIngredientIcon

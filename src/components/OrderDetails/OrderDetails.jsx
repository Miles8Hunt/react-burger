import styles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../images/done.svg';
import PropTypes from 'prop-types';


function OrderDetails({ closeModal }) {
  return(
    <div className={styles.content}>
      <h1 className={`${styles.title} text text_type_digits-large mt-30 mb-8`}>034536</h1>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={done} alt="done"></img>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
      <div className={styles.closeIcon} onClick={closeModal}> 
        <CloseIcon type="primary" />
      </div>
    </div>
  )
};

OrderDetails.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default OrderDetails
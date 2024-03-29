import styles from './OrderDetails.module.css';
import done from '../../images/done.svg';
import { FC } from 'react';
import { IOrderNumber } from '../../services/types/types';


const OrderDetails: FC<IOrderNumber> = ({ orderNumber }) => {

  return(
    <div className={styles.content}>
      <h1 className={`${styles.title} text text_type_digits-large mt-30 mb-8`}>
        {orderNumber ? `${orderNumber}` : '- - - -'}
      </h1>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={done} alt="done"></img>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};


export default OrderDetails

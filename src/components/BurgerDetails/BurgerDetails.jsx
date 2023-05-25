import styles from './BurgerDetails.module.css';
import BurgerDetailsList from "../BurgerDetailsList/BurgerDetailsList";
import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from "react-router-dom";
import { useOrderData } from '../../utils/useOrderData';


function BurgerDetails() {

  const { id } = useParams();
  const orders = useSelector((state) => state.wsReducer.orders);
  const order = orders.find((item) => item._id === id);
  const { orderIngredients, orderStatus, orderPrice } = useOrderData(order);

  return (
    order && (
    <div className={styles.main}>
      <div className={styles.title}>
        <p className={`${styles.number} text text_type_digits-default mb-10`}>{`#${order.number}`}</p>
        <p className='text text_type_main-medium mb-2'>{`${order.name}`}</p>
        {(order.status === 'done') 
            ? <p className='text text_type_main-default text_color_success'>{orderStatus}</p>
            : <p className='text text_type_main-default text_color_primary'>{orderStatus}</p>
        }
      </div>
      <BurgerDetailsList ingredients={orderIngredients} />
      <div className={styles.container}>
        <div className={styles.price}>
          <CurrencyIcon type="primary" />
          <p className='text text_type_digits-default'>{orderPrice}</p>
        </div>
      </div>
    </div>
    )
  );
}

export default BurgerDetails

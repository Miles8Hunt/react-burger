import styles from './OrderFeedItem.module.css';
import OrderIconesList from '../OrderIconesList/OrderIconesList';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import { useOrderData } from '../../utils/useOrderData';
import { FC } from 'react';
import { IOrderFeedItem } from '../../services/types/types';


const OrderFeedItem: FC<IOrderFeedItem> = ({ order }) => {
  
  const [isProfile, setIsProfile] = useState(false);
  const location = useLocation();
  const { orderIngredients, orderStatus, orderPrice, matchProfile } = useOrderData(order);


  useEffect(() => {
    if (matchProfile) {
      setIsProfile(true)
    }
  }, [matchProfile])
  
  return (
    <article className={Boolean(matchProfile) ? `${styles.profileOrder}` : `${styles.order}`}>

      <Link className={styles.link}  
            to={isProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
            state={isProfile ? { locationProfileOrderFeed: location } : { locationOrderFeed: location }} >
        <div className={`${styles.info} mb-6`}>
          <p className={'text text_type_digits-default'}>#{order.number}</p>
        </div>
        <h3 className={'text text_type_main-medium'}>{order.name}</h3>
        
        {Boolean(matchProfile) &&
          <p className='text text_type_main-default status'>{orderStatus}</p>
        }

        <div className={`${styles.info} mt-6`}>
          <OrderIconesList ingredients={orderIngredients} />
          <span className={`${styles.sum} text text_type_digits-medium mr-10`}>{orderPrice}{<CurrencyIcon type='primary' />}</span>
        </div>
      </Link>

    </article>
  )
}


export default OrderFeedItem

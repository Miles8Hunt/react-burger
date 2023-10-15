import styles from './OrderFeed.module.css';
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import { FC } from 'react';
import { IOrderFeed } from '../../services/types/types';


const OrderFeed: FC<IOrderFeed> = ({ orders, listClassName }) => {
  
  return (
    <ul className={cn(styles.list, listClassName)}>
      {orders.map((order) => {
        return (
          <OrderFeedItem key={uuidv4()} order={order} />
        )
      })}
    </ul>
  )
}


export default OrderFeed

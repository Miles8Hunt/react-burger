import styles from './OrderFeed.module.css';
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import PropTypes from 'prop-types';


function OrderFeed({ orders, listClassName }) {
  
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

OrderFeed.propTypes = {
  orders: PropTypes.array.isRequired,
  listClassName: PropTypes.string
}

export default OrderFeed

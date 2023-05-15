import styles from './feed.module.css';
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import OrderCounters from '../../components/OrderCounters/OrderCounters';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { WS_URL } from '../../utils/api';


function FeedOrders() {

  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.wsReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}/all`))
    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [])

  const { doneList, workList } = useMemo(() => {
    return orders.reduce(
      (count, item) => {
        switch (item.status) {
          case "done":
            count.doneList.push(item.number);
            break;
          case "pending":
            count.workList.push(item.number);
            break;
        }
        return count;
      },
      { doneList: [], workList: [] }
    );
  }, [orders]);

  return (
    orders && ( 
      <main className={styles.main}>
        <p className="text text_type_main-large pt-10 pb-5">Лента заказов</p>
        <div className={styles.container}>
          <OrderFeed orders={orders} />
          <OrderCounters
            total={total}
            totalToday={totalToday}
            doneList={doneList}
            workList={workList}
          />
        </div>
      </main>
    )
  );
}

export default FeedOrders

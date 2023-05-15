import styles from './profileOrders.module.css';
import ProfileNavigate from '../../components/ProfileNavigate/ProfileNavigate';
import OrderFeed from '../../components/OrderFeed/OrderFeed';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookies';
import { WS_URL } from '../../utils/api';


function ProfileOrders() {

  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken").split("Bearer ")[1];
  const { orders, error } = useSelector((state) => state.wsReducer);
  
  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`))
  }, [dispatch, accessToken])

  useEffect(() => {
    if (error) {
      dispatch(wsConnectionClosed());
      dispatch(getUser())
        .then(() => dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`)))
        .catch(() => dispatch(wsConnectionClosed()));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, accessToken, error]);

  return (
    orders && 
    <section className={styles.container}>
      <div className={styles.navigate}>
        <ProfileNavigate />
      </div>
      <OrderFeed orders={orders} listClassName={styles.feed} />
    </section>
  )
}

export default ProfileOrders;

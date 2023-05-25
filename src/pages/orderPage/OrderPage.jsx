import styles from './OrderPage.module.css';
import BurgerDetails from "../../components/BurgerDetails/BurgerDetails";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from '../../services/actions/burgerIngredients';
import { getCookie } from '../../utils/cookies';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { WS_URL } from '../../utils/api';


function OrderPage({ isLogin }) {

  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector((state) => state.wsReducer.orders);
  const order = orders.find((item) => item._id === id);

  useEffect(() => {
    dispatch(getIngredients());
    isLogin
      ? dispatch(wsConnectionStart(`${WS_URL}?token=${getCookie("accessToken").split("Bearer ")[1]}`))
      : dispatch(wsConnectionStart(`${WS_URL}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, isLogin]);

  return (
    order && (
      <div className={styles.container}>
        <BurgerDetails />
      </div>
    )
  )
}

export default OrderPage

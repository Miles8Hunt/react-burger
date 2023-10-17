import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import HomePage from '../../pages/homePage/homePage';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Notfound404 from '../../pages/not-found-404/not-found-404';
import ProtectRoute from '../ProtectRoute/ProtectRoute';
import IngredientPage from '../../pages/ingredientPage/ingredientPage';
import FeedOrders from '../../pages/feed/feed';
import ProfileOrders from '../../pages/profileOrders/profileOrders';
import OrderPage from '../../pages/orderPage/OrderPage';
import BurgerDetails from '../BurgerDetails/BurgerDetails';
import { checkAuth } from '../../services/actions/user';
import { RESET_MODAL } from '../../services/actions/ingredientDetails';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/types/types';


const App: FC = () => {

  const dispatch = useDispatch();
  const access = getCookie("accessToken")

  const location = useLocation();
  const background = location.state?.locationIngredient || 
                     location.state?.locationOrderFeed ||
                     location.state?.locationProfileOrderFeed ||
                     location;

  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);

  useEffect(() => {
      dispatch(getIngredients()); 
      dispatch(checkAuth());
  }, [dispatch]);

  function closeModal () {
    dispatch({ type: RESET_MODAL});
  };

  return (
    <div className={styles.page}> 
      <AppHeader />
      <Routes location={background}>
            
        <Route index path="/" element={<> <HomePage /> </>} ></Route>
        <Route path='/login' element={(!userInfo && !access) ? <Login /> : <Navigate to={'/'} /> }/>
        <Route path='/register' element={(!userInfo && !access) ? <Register /> : <Navigate to={'/'} /> }/>
        <Route path='/forgot-password' element={(!userInfo && !access) ? <ForgotPassword /> : <Navigate to={'/'} /> }/>
        <Route path='/reset-password' element={(!userInfo && !access) ? <ResetPassword /> : <Navigate to={'/'} /> }/>
        <Route path='/profile' element={<ProtectRoute element={<Profile />} />} />
        <Route path='/profile/orders' element={<ProtectRoute element={<ProfileOrders />} />} />
        <Route path='/feed' element={<FeedOrders />} />
        <Route path="*" element={<Notfound404 />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path='/feed/:id' element={<OrderPage isLogin={false} getIngredients={getIngredients} />} />
        <Route path='/profile/orders/:id' element={(!userInfo && !access) ? <Login /> : <OrderPage isLogin={true} getIngredients={getIngredients} />} />

      </Routes>

      {location.state?.locationIngredient && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal /*title="Детали ингредиента"*/ closeModal={closeModal} route>
              <IngredientDetails />
            </Modal> }>
          </Route>
        </Routes>
      )}
      {location.state?.locationOrderFeed && (
        <Routes>
          <Route path="/feed/:id" element={
            <Modal /*title="Детали бургера"*/ closeModal={closeModal} route>
              <BurgerDetails />
            </Modal>
          } />
        </Routes>
      )}
      {location.state?.locationProfileOrderFeed && (
        <Routes>
          <Route path="/profile/orders/:id" element={
            <Modal /*title="Детали бургера"*/ closeModal={closeModal} route>
              <BurgerDetails />
            </Modal>
          } />
        </Routes>
      )}

    </div>
  )
};

export default App;

import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Notfound404 from '../../pages/not-found-404/not-found-404';
import ProtectRoute from '../ProtectRoute/ProtectRoute';
import IngredientPage from '../../pages/ingredientPage/ingredientPage';
import { checkAuth } from '../../services/actions/user';
import { modalStatus, ingredientModalStatus } from '../../services/actions/modal';


function App() {

  const dispatch = useDispatch();
  const access = getCookie("accessToken")

  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
  const isModalOpen = useSelector(state => state.ingredientDetailsReducer.selectedIngredient);
  const isIngredientModalOpen = useSelector(state => state.modalReducer.isIngredientModalOpen);
  const currentIngredient = useSelector(state => state.burgerIngredientsReducer.currentIngredient);

  const closeModal = () => {
    isModalOpen ? dispatch(modalStatus(false)) : dispatch(ingredientModalStatus(false));
  }

  React.useEffect(() => {
      dispatch(getIngredients()); 
      dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.page}>  
        <Router>
          <Routes>

            <Route path="/" element={<> <AppHeader />
              <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstuctor />
                </DndProvider>
              </main>

              {isIngredientModalOpen && (
				      <Modal title={'Детали ингредиента'} closeModal={closeModal}>
					      <IngredientDetails ingredient={currentIngredient}/>
				      </Modal>
			        )}</>} >
            </Route>

            <Route path='/login' element={(!userInfo && !access) ? <Login /> : <Navigate to={'/'} /> }/>
            <Route path='/register' element={(!userInfo && !access) ? <Register /> : <Navigate to={'/'} /> }/>
            <Route path='/forgot-password' element={(!userInfo && !access) ? <ForgotPassword /> : <Navigate to={'/'} /> }/>
            <Route path='/reset-password' element={(!userInfo && !access) ? <ResetPassword /> : <Navigate to={'/'} /> }/>
            <Route path='/profile' element={<ProtectRoute element={<Profile />} />} />
            <Route path="*" element={<Notfound404 />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />

          </Routes>
        </Router>
    </div>
  )
};

export default App;

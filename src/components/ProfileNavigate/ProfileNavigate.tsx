import styles from './ProfileNavigate.module.css';
import { useLocation, NavLink } from 'react-router-dom';
import { logOutRequest } from '../../services/actions/user';
import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch } from '../../services/types/types';


const ProfileNavigate: FC = () => {

  const dispatch = useDispatch();
  const navigate = useLocation();

  const exit = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logOutRequest(refreshToken))
  }

  return (
    <nav className={styles.navigate}>
      <NavLink to='/profile' 
               className={() =>
               classNames(`${navigate.pathname === '/profile' ? styles.elementActive
               : styles.elementDisactive}`)}>

        <p className='text text_type_main-medium '> Профиль </p>
      </NavLink>
      <NavLink to='/profile/orders' 
               className={() =>
               classNames(`${navigate.pathname === '/profile/orders' ? styles.elementActive
               : styles.elementDisactive}`)}>

        <p className='text text_type_main-medium mt-10'> История заказов </p>
      </NavLink>
      <NavLink to='/login' 
               className={() =>
               classNames(`${navigate.pathname === '/login' ? styles.elementActive
               : styles.elementDisactive}`)}
               onClick={exit}>

        <p className='text text_type_main-medium mt-10'> Выход </p>
      </NavLink>
      <p className={`${styles.info} mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
    </nav>  
  )
}


export default ProfileNavigate

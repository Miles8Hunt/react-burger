import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';


const AppHeader: FC = () => {

  const path = useLocation().pathname;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
      <NavLink to='/' 
               className={({ isActive }) =>
               classNames(styles.link, { 'text_color_inactive': !isActive },
               `${isActive ? styles.activeLink : 'text_color_inactive'}`)}>

          <BurgerIcon type={(path === '/') ? 'primary' : "secondary"} />

          <p className="text text_type_main-default ml-2">Конструктор</p>

        </NavLink>
        <NavLink to='/feed' 
                 className={({ isActive }) =>
                 classNames(styles.link, { 'text_color_inactive': !isActive },
                 `${isActive ? styles.activeLink : 'text_color_inactive'}`)}>

          <ListIcon type={(path === '/feed') ? 'primary' : "secondary"}  />

          <p className="text text_type_main-default ml-2">Лента заказов</p>

        </NavLink>
      </nav>

      <NavLink to='/' >
        <Logo />
      </NavLink>

      <NavLink to='/profile' 
               className={({ isActive }) =>
               classNames(styles.link, styles.account, { 'text_color_inactive': !isActive },
               `${isActive ? styles.activeLink : 'text_color_inactive'}`)}>

        <ProfileIcon type={(path === '/profile') ? 'primary' : "secondary"}  />

        <p className="text text_type_main-default ml-2">Личный кабинет</p>

      </NavLink>  
    </header>
  )
};
 
export default AppHeader;

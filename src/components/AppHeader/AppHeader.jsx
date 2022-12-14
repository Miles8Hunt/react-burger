import styles from './AppHeader.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <button className={`${styles.link} pl-5 pr-5 pb-5 pt-5`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </button>
        <button className={`${styles.link} pl-5 pr-5 pb-5 pt-5`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </button>
      </nav>
      <Logo />  
      <button className={`${styles.account} pl-5 pr-5 pb-5 pt-5`}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default ml-2">Личный кабинет</p>
      </button>  
    </header>
  )
};
 
export default AppHeader;

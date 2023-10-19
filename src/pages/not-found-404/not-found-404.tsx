import styles from './not-found-404.module.css'
import { FC } from 'react';


const Notfound404: FC = () => {

  return  (
    <div className={styles.wrapper}>
      <h3 className={`${styles.error}`}>error</h3>
      <h3 className={`${styles.cat} pt-5`}>/\ _ /\</h3>
      <h3 className={`${styles.cat}`}>____________ =චᆽච= ____________</h3>
      <h3 className={`${styles.cat}`}>'~~~'</h3>
      <h1 className={`${styles.title}`}>404</h1>
      <h3 className={`${styles.subtitle}`}>Page Not Found</h3>
    </div>
  )
};


export default Notfound404

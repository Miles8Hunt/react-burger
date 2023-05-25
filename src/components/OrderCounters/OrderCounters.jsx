import styles from './OrderCounters.module.css';
import PropTypes from 'prop-types';


function OrderCounters({ total, totalToday, doneList, workList, }) {

  return (
    <section className={styles.section}>
      <div className={`${styles.container} mb-15`}>
        <div className={styles.counter}>
          <p className='text text_type_main-medium'>Готовы:</p>
          <ul className={styles.list}>

            {doneList.map((item, index) => {
              return (
                <li className='text text_type_digits-default text_color_success' key={index}>
                  {item}
                </li>
              )
            })}

          </ul>
        </div>
        <div className={styles.counter}>
          <p className='text text_type_main-medium'>В работе:</p>
          <ul className={styles.list}>

            {workList.map((item, index) => {
              return (
                <li className={'text text_type_digits-default'} key={index}>
                  {item}
                </li>
              )
            })}

          </ul>
        </div>
      </div>
      <article>
        <h3 className='text text_type_main-medium'>Выполнено за всё время:</h3>
        <span className={`${styles.digits} text text_type_digits-large`}>{total}</span>
      </article>
      <article>
        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
        <span className={`${styles.digits} text text_type_digits-large`}>{totalToday}</span>
      </article>
    </section>
  )
}

OrderCounters.propTypes = {
  doneList: PropTypes.array.isRequired,
  workList: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired
}

export default OrderCounters

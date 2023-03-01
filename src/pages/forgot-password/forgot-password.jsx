import styles from './forgot-password.module.css';
import { useForm } from '../../utils/useForm';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { forgotPasswordRequest }from '../../services/actions/forgotPassword';


const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({ email: '' });
  const redirect = () => navigate('/reset-password', { replace: true }) 
  const forgotPassword = useCallback((e) => {
      e.preventDefault();
      dispatch(forgotPasswordRequest(values, redirect));
  }, [values, dispatch]
  );

  return (
      <div className={styles.container}>
        <h1 className={styles.title}> Восстановление пароля </h1>
        <form className={styles.form} onSubmit={forgotPassword} name="restore_password">
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder="Укажите e-mail"
            isIcon={false}
            extraClass="mb-6 mt-6"
            required>
          </EmailInput>
          <div className={styles.button}>
            <Button
              type="primary"
              size="medium"
              htmlType='submit'>Восстановить
            </Button>
          </div> 
        </form>
        <div className={`${styles.actions} mt-20`}>
          <p className={styles.text}> Вспомнили пароль? </p>
          <Link to='/login' className={styles.link}> &#8194; Войти </Link>
        </div>
      </div>
  )
};
 
export default ForgotPassword

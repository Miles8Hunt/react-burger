import styles from './reset-password.module.css';
import { useForm } from '../../utils/useForm';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { resetPasswordRequest }from '../../services/actions/reserPassword';


const ResetPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({password: '', token: ''});

  const settingNewPassword = useCallback((e) =>  {
    e.preventDefault();
    dispatch(resetPasswordRequest(values));
    navigate('/');
  }, [values, dispatch]);

  const {forgotPasswordSuccess} = useSelector(state => state.forgotPasswordReducer);
  
	if (!forgotPasswordSuccess) {
		return <Navigate to={{ pathname: "/forgot-password" }} />;
	}

  return (
      <div className={styles.container}>
        <h1 className={styles.title}> Восстановление пароля </h1>
        <form className={styles.form} onSubmit={settingNewPassword} name="password_reset">
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            placeholder="Введите новый пароль"
            name={'password'}
            extraClass="mb-6 mt-6"
          />
          <Input
            onChange={handleChange}
            value={values.token}
            placeholder="Введите код из письма"
            name={'token'}
            extraClass="mb-6"
          />
          <div className={styles.submit}>
            <Button
              type="primary"
              size="medium"
              htmlType='submit'>Сохранить
            </Button>
          </div> 
        </form>
        <div className={`${styles.actions} mt-20`}>
          <p className={styles.text}> Вспомнили пароль? </p>
          <Link to='/login' className={styles.link}> &#8194; Войти </Link>
        </div>
      </div>
  )
}

export default ResetPassword

import styles from './login.module.css';
import { useForm } from '../../services/types/types';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FormEvent, useCallback } from "react";
import { logInRequest }from '../../services/actions/user';
import { FC } from 'react';
import { useDispatch } from '../../services/types/types';


const Login: FC = () => {

  const dispatch = useDispatch();

  const {values, handleChange } = useForm({email:'', password:''});

  const logIn = useCallback((e: FormEvent) => {
      e.preventDefault();
      dispatch(logInRequest(values));
  }, [values, dispatch]
  ); 

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Вход</h1>
        <form className={styles.form} onSubmit={logIn} name="sign_in">
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder={'E-mail'}
            extraClass="mb-6 mt-6">
          </EmailInput>
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            placeholder={'Пароль'}
            extraClass="mb-6">
          </PasswordInput>
            <div className={styles.submit}>
              <Button
                type="primary"
                size="medium"
                htmlType='submit'>Войти          
              </Button>
            </div> 
        </form>
        <div className={`${styles.actions} mt-20`}>
          <p className={styles.text}>Вы - новый пользователь?</p>
          <Link to='/register' className={styles.link} >&#8194; Зарегистрироваться </Link>
        </div>
        <div className={`${styles.actions} mt-4`}>
          <p className={styles.text}>Забыли пароль?</p>
          <Link to='/forgot-password' className={styles.link}> &#8194; Восстановить пароль </Link>
        </div>
      </div>
  )
};


export default Login

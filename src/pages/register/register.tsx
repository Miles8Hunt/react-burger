import styles from './register.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useCallback } from "react";
import { registerUserRequest } from '../../services/actions/register';
import { FC } from 'react';
import { useDispatch, useForm } from '../../services/types/types';


const Register: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange } = useForm({
    name: '', 
    email: '', 
    password: ''
  });

  const createAccout = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUserRequest(values));
    navigate('/');
  }, [values, dispatch]);
  
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form} onSubmit={createAccout}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            size={'default'}
            extraClass="mt-6 mb-6"
          />
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder="E-mail"
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            extraClass="mb-6"
          />
          <div className={styles.submit}>
            <Button
              type="primary"
              size="medium"
              htmlType='submit'
              >Зарегистрироваться
            </Button>
          </div> 
        </form>
        <div className={`${styles.actions} mt-20`}>
          <p className={styles.text}> Уже зарегистрированы? </p>
          <Link to='/login' className={styles.link}> &#8194; Войти </Link>
        </div>
      </div> 
  )
};


export default Register

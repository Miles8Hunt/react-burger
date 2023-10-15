import styles from './profile.module.css';
import ProfileNavigate from '../../components/ProfileNavigate/ProfileNavigate';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react";
import { getCookie } from '../../utils/cookies';
import { updateUserData } from '../../services/actions/user';
import { checkAuth } from '../../services/actions/user';
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/types';


const Profile: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.name);
      setUserEmail(userInfo.email);
      setUserPassword(userPassword);
    } else {
      dispatch(checkAuth());
      navigate('/profile', { replace: true })
    }
  }, [dispatch, userInfo, navigate, userPassword])

  const handleResetData = (e: MouseEvent) => {
    e.preventDefault();
    setUserName(userInfo.name);
    setUserEmail(userInfo.email);
    setUserPassword('');
  }

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
  }

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserPassword(value);
  }

  const accessToken = getCookie('accessToken')

  const saveUserData = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserData(accessToken, userName, userEmail, userPassword));
  }

  return (
      <div className={styles.container}>
        <ProfileNavigate />
          <form className={styles.form} onSubmit={saveUserData} name="profile">
            <Input
              onChange={changeName}
              value={userName}
              name={'name'}
              placeholder="Имя"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <Input
              onChange={changeEmail}
              value={userEmail}
              name={'email'}
              placeholder="Логин"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <PasswordInput
              onChange={changePassword}
              value={userPassword}
              name={'password'}
              placeholder="Пароль"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <div className={styles.actions}>
              <button className={styles.cancel} onClick={handleResetData}>Отмена </button>
              <Button
                onClick={saveUserData}
                type="primary"
                size="medium"
                htmlType='submit'
                >Сохранить
              </Button> 
            </div>
          </form>  
          <div className={styles.div}></div>
      </div>
  )
};


export default Profile

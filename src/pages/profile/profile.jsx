import styles from './profile.module.css';
import AppHeader from '../../components/AppHeader/AppHeader';
import ProfileNavigate from '../../components/ProfileNavigate/ProfileNavigate';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getCookie } from '../../utils/cookies';
import { updateUserData } from '../../services/actions/user';


const Profile = () => {

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
  console.log(userInfo)
  
  let userEmail = userInfo.email
  let userName = userInfo.name

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');

  const [form, setForm] = useState({
		email: userInfo.email,
		name: userInfo.name,
		password: '',
	});
  const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

  const handleResetData = (evt) => {
    evt.preventDefault();
    setName(userName)
    setEmail(userEmail)
  }

  const changeName = evt => {
    const value = evt.target.value;
    setName(value);
  };

  const changeEmail = evt => {
    const value = evt.target.value;
    setEmail(value);
  };

  const changePassword = evt => {
    const value = evt.target.value;
    setPassword(value);
  };

  const accessToken = getCookie('accessToken')

  const saveUserData = useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateUserData(accessToken, name, email, password));
  }, [accessToken, name, email, password, dispatch]
  );

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <ProfileNavigate />
          <form className={styles.form} onSubmit={saveUserData} name="profile">
            <Input
              onChange={changeName}
              value={form.name}
              name={'name'}
              placeholder="Имя"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <EmailInput
              onChange={changeEmail}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <PasswordInput
              onChange={changePassword}
              value={form.password}
              name={'password'}
              placeholder="Пароль"
              icon={"EditIcon"}
              extraClass="mb-6"
              size={"default"}
            />
            <div className={styles.actions}>
              <button className={styles.cancel} onClick={handleResetData}>Отмена </button>
              <Button
                type="primary"
                size="medium"
                htmlType='submit'
                onClick={saveUserData}>Сохранить
              </Button> 
            </div>
          </form>  
          <div className={styles.div}></div>
      </div>
    </>
  )
};

export default Profile

import styles from './profile.module.css';
import ProfileNavigate from '../../components/ProfileNavigate/ProfileNavigate';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/cookies';
import { updateUserData } from '../../services/actions/user';
import { checkAuth } from '../../services/actions/user';
import { useNavigate } from "react-router-dom";


const Profile = () => {

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

  const handleResetData = (evt) => {
    evt.preventDefault();
    setUserName(userInfo.name);
    setUserEmail(userInfo.email);
    setUserPassword('');
  }

  const changeName = (e) => {
    const value = e.target.value;
    setUserName(value);
  }

  const changeEmail = (e) => {
    const value = e.target.value;
    setUserEmail(value);
  }

  const changePassword = (e) => {
    const value = e.target.value;
    setUserPassword(value);
  }

  const accessToken = getCookie('accessToken')

  const saveUserData = (e) => {
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
            <EmailInput
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

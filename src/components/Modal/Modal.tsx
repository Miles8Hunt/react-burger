import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { IModal } from '../../services/types/types';


const modalsContainer = document.querySelector('#modals') as HTMLElement;

const Modal: FC<IModal> = ({ closeModal, children, route }) => {

  const navigate = useNavigate();

  function handleClose() {
    if (route) {
      return navigate(-1);
    } else {
      closeModal();
    }
  }

  React.useEffect(() => {
    function closeModalByEsc (evt: KeyboardEvent) {
      evt.key === "Escape" && handleClose();
    };
    document.addEventListener('keydown', closeModalByEsc)
    return() => {
      document.removeEventListener('keydown', closeModalByEsc)
    };
  }, [handleClose])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.closeIcon} > 
          <CloseIcon type="primary" onClick={handleClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={handleClose} />
    </>, modalsContainer
  )
};


export default Modal

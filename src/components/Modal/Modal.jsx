import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const modalsContainer = document.querySelector('#modals');

const Modal = ({ closeModal, children, route}) => {

  const navigate = useNavigate();

  function handleClose(evt) {
    if (route) {
      return navigate(-1);
    } else {
      closeModal(evt);
    }
  }

  React.useEffect(() => {
    function closeModalByEsc (evt) {
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

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal

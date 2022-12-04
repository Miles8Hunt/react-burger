import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ closeModal, children }) => {

  useEffect(() => {

    function closeModalByEsc (evt) {
      evt.key === "Escape" && closeModal();
    };

    document.addEventListener('keydown', closeModalByEsc)
    
    return() => {
      document.removeEventListener('keydown', closeModalByEsc)
    };
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.closeIcon} > 
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={closeModal} />
    </>, modalsContainer
  )
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal

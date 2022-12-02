import React, { useEffect } from 'react' 
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onEscKeydown, onOverlayClick, children }) => {

  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown)
    return() => {
      document.removeEventListener('keydown', onEscKeydown)
    };
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>, modalsContainer
  )
};

Modal.propTypes = {
  onEscKeydown: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal
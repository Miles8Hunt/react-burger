import styles from './ModalOverlay.module.css';
import { FC } from 'react';
import { IModalOverlay } from '../../services/types/types';


const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {

  return (
    <div className={styles.overlay} onClick={onClick}></div>
  )
};


export default ModalOverlay

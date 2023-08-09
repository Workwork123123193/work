import { useState } from 'react';
import Modal from 'react-modal';

import styles from './modalBuy.module.scss';
import './modalBuy.scss';
import ModalSuccess from '../modalSuccess/ModalSuccess';
import dollar from '@assets/dollar.svg';
import metamask from '@assets/metamask.svg';

const ModalBuy = ({ isOpen, handleCloseModal }) => {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  const handleToggleModals = () => {
    handleCloseModal(false);
    setIsOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setIsOpenSuccess(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Способ оплаты"
        className={styles.content}>
        <h2 className={styles.title}>Оплатить семинар</h2>
        <p className={styles.text}>Выберите способ оплаты</p>
        <div className={styles.buttons}>
          <button className={styles.system}>
            <img src={dollar} width={14} height={19} alt="dollar" />
            <span>Платежная система</span>
          </button>
          <button onClick={handleToggleModals} className={styles.metamask}>
            <img src={metamask} width={20} height={21} alt="metamask" />
            <span>Metamask</span>
          </button>
        </div>
      </Modal>
      <ModalSuccess isOpenSuccess={isOpenSuccess} handleCloseSuccess={handleCloseSuccess} />
    </div>
  );
};

export default ModalBuy;

import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import cn from 'classnames';

import styles from './modalSuccess.module.scss';
import styles2 from '../modalBuy/modalBuy.module.scss';
import successPng from '@assets/check.png';
import successWebp from '@assets/check.webp';

const ModalSuccess = ({ isOpenSuccess, handleCloseSuccess }) => {
  return (
    <div>
      <Modal
        isOpen={isOpenSuccess}
        onRequestClose={handleCloseSuccess}
        contentLabel="Способ оплаты"
        className={cn(styles2.content, styles.content)}>
        <div className={styles.imgWrapper}>
          <picture>
            <source srcSet={successWebp} type="image/webp" />
            <img
              className={styles.avatar}
              src={successPng}
              width={130}
              height={130}
              alt="success"
              loading="lazy"
            />
          </picture>
        </div>
        <h2 className={styles2.title}>Запись прошла успешно</h2>
        <p className={styles2.text}>
          Вы успешно записались на семинар Ознакомиться со списком семинаров Вы можете в своем
          профиле
        </p>
        <Link className={styles.btn} to={'/profile'}>
          Перейти в профиль
        </Link>
      </Modal>
    </div>
  );
};

export default ModalSuccess;

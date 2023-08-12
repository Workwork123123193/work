import { useState, useEffect } from 'react';

import styles from './seminarsItems.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';
import ModalBuy from '../modalBuy/ModalBuy';
import ModalSuccess from '../modalSuccess/ModalSuccess';
import { getSeminars } from '@service/user/seminars';

const SeminarItems = () => {
  const [seminars, setSeminars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCloseSuccess = () => {
    setIsOpenSuccess(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items } = await getSeminars();
        setSeminars(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.seminars}>
      {seminars.length
        ? seminars.map((item) => {
            return <SeminarItem key={item.id} {...item} setIsOpen={setIsOpen} />;
          })
        : null}
      <ModalBuy
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        isOpenSuccess={isOpenSuccess}
        handleCloseSuccess={handleCloseSuccess}
      />
      <ModalSuccess isOpenSuccess={isOpenSuccess} handleCloseSuccess={handleCloseSuccess} />
    </div>
  );
};

export default SeminarItems;

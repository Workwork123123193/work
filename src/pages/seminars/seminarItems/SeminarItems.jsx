import { useState, useEffect } from 'react';

import styles from './seminarsItems.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';
import ModalBuy from '../modalBuy/ModalBuy';
import ModalSuccess from '../modalSuccess/ModalSuccess';
import { getSeminars } from '@service/user/seminars';

const SeminarItems = () => {
  const [seminars, setSeminars] = useState([]);
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isWasBuy, setIsWasBuy] = useState(false);

  const handleCloseModal = () => {
    setIsOpenBuy(false);
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
  }, [isWasBuy]);

  return (
    <div className={styles.seminars}>
      {seminars.length
        ? seminars.map((item) => {
            return (
              <SeminarItem
                key={item.id}
                {...item}
                setIsOpenBuy={setIsOpenBuy}
                setIsWasBuy={setIsWasBuy}
              />
            );
          })
        : null}
      <ModalBuy
        isOpenBuy={isOpenBuy}
        handleCloseModal={handleCloseModal}
        isOpenSuccess={isOpenSuccess}
        handleCloseSuccess={handleCloseSuccess}
      />
      <ModalSuccess isOpenSuccess={isOpenSuccess} handleCloseSuccess={handleCloseSuccess} />
    </div>
  );
};

export default SeminarItems;

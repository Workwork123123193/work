import { useState, useEffect } from 'react';

import styles from './seminarsItems.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';
import { getSeminars } from '@service/user/seminars';

const SeminarItems = () => {
  const [seminars, setSeminars] = useState([]);

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
            return <SeminarItem key={item.id} {...item} />;
          })
        : null}
    </div>
  );
};

export default SeminarItems;

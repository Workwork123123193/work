import { useState, useEffect } from 'react';

import styles from './seminarsItems.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';
import { getSeminars } from '@service/user/seminars';

const SeminarItems = () => {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    getSeminars().then(({ items }) => setSeminars(items));
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
import { useState, useEffect } from 'react';

import styles from './items.module.scss';
import Item from '../item/Item';
import { getSignals } from '@service/admin/signals';

const Items = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const { items } = await getSignals();
        console.log(items);
        setData(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSignals();
  }, []);

  return (
    <div className={styles.items}>
      {data.length
        ? data.map((item) => {
            return <Item key={item.title} {...item} />;
          })
        : null}
    </div>
  );
};

export default Items;

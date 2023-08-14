import { useState, useEffect } from 'react';

import styles from '../../signals/items/items.module.scss';
import Item from '../item/Item';
import { getInvestments } from '@service/admin/investments';

const Items = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const { items } = await getInvestments();
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

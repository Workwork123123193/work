import { useState, useEffect } from 'react';

import styles from './items.module.scss';
import Item from '../item/Item';
import { getNews } from '../../../service/admin/news';

const Items = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { items } = await getNews();
        setData(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.items}>
      {data.length
        ? data.map((item) => {
            return <Item key={item.id} {...item} />;
          })
        : null}
    </div>
  );
};

export default Items;

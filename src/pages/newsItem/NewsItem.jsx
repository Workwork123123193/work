import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './newsItem.module.scss';
import Item from '../news/item/Item.jsx';
import { getNews, getNew } from '@service/admin/news';

const NewsItem = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const response = await getNew(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNew();
  }, [id]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { items } = await getNews();
        const filteredItems = items.filter((item) => +item.id !== +id);
        setNews(filteredItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <section className="section">
      <div className="container">
        <div className={styles.content}>
          <div className={styles.wrapper}>
            {data && <Item {...data} />}
            <div className={styles.paragraphs}>
              {data &&
                data.elements &&
                data.elements.map((item) => {
                  return <p key={item.id}>{item.value}</p>;
                })}
            </div>
          </div>
          <div className={styles.items}>
            {news &&
              news.map((item) => {
                return <Item key={item.id} {...item} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsItem;

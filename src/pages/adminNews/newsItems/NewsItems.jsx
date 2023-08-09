import styles from './newsItem.module.scss';
import NewsItem from '../newsItem/NewsItem';

const SeminarItems = ({ items, setIsDelete }) => {
  return (
    <div className={styles.news}>
      {items?.length
        ? items.map((item) => {
            return <NewsItem key={item.id} {...item} setIsDelete={setIsDelete} />;
          })
        : 'loading'}
    </div>
  );
};

export default SeminarItems;

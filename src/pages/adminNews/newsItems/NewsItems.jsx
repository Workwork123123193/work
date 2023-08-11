import NewsItem from '../newsItem/NewsItem';
import styles from "../../../styles.module.scss";

const SeminarItems = ({ items, setIsDelete }) => {
  return (
    <div className={styles.bGrid}>
      {items?.length
        ? items.map((item) => {
          return <NewsItem key={item.id} {...item} setIsDelete={setIsDelete} />;
        })
        : 'loading'}
    </div>
  );
};

export default SeminarItems;

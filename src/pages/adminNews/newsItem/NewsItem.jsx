import styles from './newsItem.module.scss';

const NewsItem = ({ title, category, imageUrl, source, date, setIsDelete }) => {
  return <div className={styles.item}>{title}</div>;
};

export default NewsItem;

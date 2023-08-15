import { Link } from 'react-router-dom';

import styles from './item.module.scss';
import noImg from '../../../assets/netologia.jpg';
import clock from '../../../assets/clock-white.svg';
import { getTime } from '../utils/getTime';
import { removeUrlPrefix } from '../utils/removeUrlPrefix';

const Item = ({ imageUrl, title, category, source, date, id }) => {
  return (
    <Link className={styles.item} to={`/${id}`}>
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.bottom}>
          <div className={styles.source}>{removeUrlPrefix(source)}</div>
          <div className={styles.date}>
            <img className={styles.clock} src={clock} width={20} height={20} alt="time" />
            <span>{getTime(date)}</span>
          </div>
        </div>
      </div>
      <img className={styles.img} src={imageUrl ? imageUrl : noImg} alt="img" loading="lazy" />
    </Link>
  );
};

export default Item;

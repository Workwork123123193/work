import styles from '../../../styles.module.scss';
import deleteSvg from '@assets/delete.svg';
import clockWhiteSvg from '@assets/clock-white.svg';
import defaultImage from '@assets/netologia.jpg';
import { getTime } from '../../news/utils/getTime';
import { removeUrlPrefix } from '../../news//utils/removeUrlPrefix';

const NewsItem = ({ title, category, imageUrl, source, date, setIsDelete }) => {
  return (
    <div className={styles.bNewsBlock}>
      <div className={`${styles.bRow} ${styles.bRow_justBtw}`}>
        <div className={`${styles.bText} ${styles.bText_v2}`}>{category}</div>
        <button className={`${styles.bButton} ${styles.bButton_delete}`} onClick={setIsDelete}>
          <img className={styles.bIcon} src={deleteSvg} alt="delete" />
        </button>
      </div>
      <div className={styles.bCol}>
        <div
          className={`${styles.bText_w} ${styles.bText_sbold}`}
          style={{ color: 'white', fontSize: '14px', marginBottom: '5px' }}>
          {title}
        </div>
        <div
          className={`${styles.bRow} ${styles.bRow_alBtm} ${styles.bRow_justBtw} ${styles.bRow_tMg10px}`}>
          <div
            className={`${styles.bText} ${styles.bText_10px} ${styles.bText_400}`}
            style={{ color: '#e0aeff' }}>
            {removeUrlPrefix(source)}
          </div>
          <div className={`${styles.bRow} ${styles.bRow_wFit}`}>
            <img className={`${styles.bIcon} ${styles.bIcon_v1}`} src={clockWhiteSvg} alt="clock" />
            <div
              className={`${styles.bText} ${styles.bText_10px} ${styles.bText_w} ${styles.bText_500}`}>
              {getTime(date)}
            </div>
          </div>
        </div>
      </div>

      <img
        className={`${styles.bImg} ${styles.bImg_v1}`}
        crossOrigin="anonymous"
        src={imageUrl !== null ? imageUrl : defaultImage}
        loading="lazy"
        alt="card-background"
      />
    </div>
  );
};

export default NewsItem;

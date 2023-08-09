import styles from '../styles.module.scss';
import deleteSvg from '@assets/delete.svg';
import clockWhiteSvg from '@assets/clock-white.svg';
import { useEffect, useState } from 'react';

const NewsItem = ({ title, category, imageUrl, source, date, setIsDelete }) => {

  const [formatDate, setFormatDate] = useState(0);

  useEffect(() => {

    // Calculate the difference between the current date and the target date
    const targetDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = targetDate - currentDate;

    // Calculate days and hours from milliseconds
    const days = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
    const hours = Math.abs(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    // Create the time difference string
    let timeDifferenceStr = '';
    if (days > 0) {
      timeDifferenceStr += `${days} д`;
    } else if (hours > 0) {
      timeDifferenceStr += `${hours} ч`;
    }
    setFormatDate(timeDifferenceStr);
  }, []);

  return (

    <div className={styles.bNewsBlock}>

      {/* First Row (Category title and Delete option) */}
      <div className={`${styles.bRow} ${styles.bRow_justBtw}`}>

        {/* Category title */}
        <div className={`${styles.bText} ${styles.bText_v2}`}>{category}</div>

        {/* Delete option */}
        <button className={`${styles.bButton} ${styles.bButton_delete}`} onClick={setIsDelete}>
          <img className={styles.bIcon} src={deleteSvg} alt="delete" />
        </button>
      </div>

      {/* Second Column */}
      <div className={styles.bCol}>
        {/* Main title */}
        <div className={`${styles.bText_w} ${styles.bText_sbold}`}>{title}</div>

        {/* Second Row (Website link and Amount of days) */}
        <div className={`${styles.bRow} ${styles.bRow_alBtm} ${styles.bRow_justBtw} ${styles.bRow_tMg10px}`}>

          {/* Website link */}
          <div className={`${styles.bText} ${styles.bText_10px} ${styles.bText_400}`} style={{ color: "#e0aeff" }}>{source.split('/')[2]}</div>

          {/* Amount of days */}
          <div className={`${styles.bRow} ${styles.bRow_wFit}`}>
            <img className={`${styles.bIcon} ${styles.bIcon_v1}`} src={clockWhiteSvg} alt="clock-white" />
            <div className={`${styles.bText} ${styles.bText_10px} ${styles.bText_w} ${styles.bText_500}`}>{formatDate}</div>
          </div>
        </div>
      </div>

      {/* Backgroung image */}
      <img className={`${styles.bImg} ${styles.bImg_v1}`} crossOrigin="anonymous" src={imageUrl} alt="card-background" />
    </div>
  );
};

export default NewsItem;

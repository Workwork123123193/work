import styles from './seminarsItem.module.scss';

import { getMonthName } from '../utils/getMonthName';
import calendar from '@assets/calendar-violet.svg';
import clock from '@assets/clock-violet.svg';
import users from '@assets/users-violet.svg';

const SeminarItem = ({ imageUrl, title, date, seats, description }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, 'text/html');

  const paragraph = doc.querySelector('p').textContent;
  const listItems = Array.from(doc.querySelectorAll('li')).map((li) => li.textContent);
  const dateTime = new Date(date);
  const day = dateTime.getDate() - 1;
  const monthIndex = dateTime.getUTCMonth();
  const month = getMonthName(monthIndex);
  const year = dateTime.getFullYear();
  const options = { timeZone: 'UTC', hour12: false };
  const time = dateTime.toLocaleTimeString('en-US', options).substring(0, 5);

  return (
    <div className={styles.item}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} width={360} height={208} alt={title} />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.icons}>
          <div className={styles.iconsItem}>
            <img src={calendar} width={14} height={15} alt="date" />
            <span className={styles.iconsSpan}>
              {day} {month} {year} {time}
            </span>
          </div>
          <div className={styles.iconsItem}>
            <img src={clock} width={15} height={15} alt="clock" />
            <span className={styles.iconsSpan}>{time}</span>
          </div>
          <div className={styles.iconsItem}>
            <img src={users} width={21} height={13} alt="users" />
            <span className={styles.iconsSpan}>{seats}</span>
          </div>
        </div>
        <p className={styles.p}>{paragraph}</p>
        <ul>
          {listItems.map((item, index) => {
            return (
              <li className={styles.li} key={index}>
                {item}
              </li>
            );
          })}
        </ul>
        <div className={styles.bottom}>
          <div className={styles.bottomItem}>
            <span className={styles.bottomSpan}>Стоимость</span>
            <span className={styles.bottomViolet}>Бесплатно</span>
          </div>
          <div className={styles.bottomItem}>
            <span className={styles.bottomSpan}>Свободных мест</span>
            <span className={styles.bottomViolet}>24</span>
          </div>
        </div>
        <button className={styles.btn}>Записаться на семинар</button>
      </div>
    </div>
  );
};

export default SeminarItem;

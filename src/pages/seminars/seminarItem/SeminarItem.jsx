import styles from './seminarsItem.module.scss';

import { getMonthName } from '../utils/getMonthName';
import calendar from '@assets/calendar-violet.svg';
import clock from '@assets/clock-violet.svg';
import users from '@assets/users-violet.svg';

const SeminarItem = ({ imageUrl, title, description, date, seats, members, price, setIsOpen }) => {
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(description, 'text/html');

  // const paragraph = doc.querySelector('p').textContent;
  // const listItems = Array.from(doc.querySelectorAll('li')).map((li) => li.textContent);
  const dateTime = new Date(date);
  const day = dateTime.getDate() - 1;
  const monthIndex = dateTime.getUTCMonth();
  const month = getMonthName(monthIndex);
  const year = dateTime.getFullYear();
  const options = { timeZone: 'UTC', hour12: false };
  const time = dateTime.toLocaleTimeString('en-US', options).substring(0, 5);

  const handleBuySeminar = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.item}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} width={360} height={208} alt={title} loading="lazy" />
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
            <img src={clock} width={16} height={15} alt="clock" />
            <span className={styles.iconsSpan}>{time}</span>
          </div>
          <div className={styles.iconsItem}>
            <img src={users} width={22} height={15} alt="users" />
            <span className={styles.iconsSpan}>{members}</span>
          </div>
        </div>
        <p className={styles.p}>{description}</p>
        <ul className={styles.ul}>
          {/* {listItems.map((item, index) => {
            return (
              <li className={styles.li} key={index}>
                {item}
              </li>
            );
          })} */}
          <li className={styles.li}>Lorem ipsum dolor sit amet</li>
          <li className={styles.li}>Lorem ipsum dolor sit amet amet</li>
          <li className={styles.li}>Lorem ipsum dolor sit amet amet amet</li>
        </ul>
        <div className={styles.bottom}>
          <div className={styles.bottomItem}>
            <span className={styles.bottomSpan}>Стоимость</span>
            <span className={styles.bottomViolet}>{price}</span>
          </div>
          <div className={styles.bottomItem}>
            <span className={styles.bottomSpan}>Свободных мест</span>
            <span className={styles.bottomViolet}>{seats}</span>
          </div>
        </div>
        <button className={styles.btn} onClick={handleBuySeminar}>
          Записаться на семинар
        </button>
      </div>
    </div>
  );
};

export default SeminarItem;

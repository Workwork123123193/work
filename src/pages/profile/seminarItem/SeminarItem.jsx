import styles from './seminarItem.module.scss';
import { getMonthName } from '../../seminars/utils/getMonthName';
import { getTimes } from '../../seminars/utils/getTimes';
import clockWhite from '@assets/clock-white.svg';
import usersWhite from '@assets/users-white.svg';
import calendarWhite from '@assets/calendar-white.svg';

const SeminarItem = ({ title, link, date, imageUrl, members }) => {
  const dateTime = new Date(date);
  const monthIndex = dateTime.getUTCMonth();
  const { day, year, time } = getTimes(dateTime);

  return (
    <div
      className={styles.seminarsItem}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className={styles.content}>
        <h3 className={styles.seminarsItemTitle}>{title}</h3>
        <div className={styles.seminarsItemInfos}>
          <div className={styles.seminarsItemInfo}>
            <img src={calendarWhite} width={12} height={13} alt="date" />
            <span className={styles.seminarsItemSpan}>
              {day} {getMonthName(monthIndex)} {year}
            </span>
          </div>
          <div className={styles.seminarsItemInfo}>
            <img src={clockWhite} width={13} height={13} alt="clock" />
            <span className={styles.seminarsItemSpan}>{time}</span>
          </div>
          <div className={styles.seminarsItemInfo}>
            <img src={usersWhite} width={20} height={13} alt="users" />
            <span className={styles.seminarsItemSpan}>{members}</span>
          </div>
        </div>
        <a
          className={styles.seminarsItemLink}
          href={link}
          target="_blank"
          rel="noopener noreferrer">
          Перейти на семинар
        </a>
      </div>
    </div>
  );
};

export default SeminarItem;

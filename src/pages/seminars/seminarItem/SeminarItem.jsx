import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import styles from './seminarsItem.module.scss';
import { getMonthName } from '../utils/getMonthName';
import { domParser } from '../utils/domParser';
import { getTimes } from '../utils/getTimes';
import { buySeminar } from '@service/user/seminars';
import calendar from '@assets/calendar-violet.svg';
import clock from '@assets/clock-violet.svg';
import users from '@assets/users-violet.svg';

const SeminarItem = ({
  imageUrl,
  title,
  description,
  date,
  seats,
  members,
  price,
  id,
  setIsOpenBuy,
  setIsWasBuy,
}) => {
  const { data } = useSelector(({ user }) => user);
  const dateTime = new Date(date);
  const monthIndex = dateTime.getUTCMonth();
  const { day, year, time } = getTimes(dateTime);

  const handleBuySeminar = async () => {
    if (!data) {
      toast('Вы не авторизованы');
      return;
    }

    try {
      await buySeminar(id);
      setIsWasBuy((prev) => !prev);
      toast('Семинар успешно куплен');
    } catch (error) {
      if (error.response.data.statusCode === 409) {
        toast('Вы уже купили этот семинар');
      }
    }
    // setIsOpenBuy(true);
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
              {day} {getMonthName(monthIndex)} {year}
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
        <p className={styles.p}>На курсе вы узнаете</p>
        <ul className={styles.ul}>
          {domParser(description).map((item, index) => {
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
            <span className={styles.bottomViolet}>{price + ' руб'}</span>
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

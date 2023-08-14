import { Link } from 'react-router-dom';

import styles from './seminarItem.module.scss';
import { deleteSeminar } from '@service/admin/seminars';
import { getMonthName } from '../../seminars/utils/getMonthName';
import { domParser } from '../../seminars/utils/domParser';
import { getTimes } from '../../seminars/utils/getTimes';
import edit from '@assets/edit.svg';
import trash from '@assets/delete.svg';
import clock from '@assets/clock-violet.svg';
import calendar from '@assets/calendar-violet.svg';
import usersWhite from '@assets/users-white.svg';
import usersViolet from '@assets/users-violet.svg';

const SignalItem = ({ item, setIsDelete }) => {
  const dateTime = new Date(item.date);
  const monthIndex = dateTime.getUTCMonth();
  const { day, year, time } = getTimes(dateTime);

  const handleDeleteItem = async (id) => {
    try {
      await deleteSeminar(id);
      setIsDelete((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={item.id} className={styles.seminar}>
      <div className={styles.imgWrapper}>
        {item.imageUrl && (
          <img src={item.imageUrl} width={180} height={114} loading="lazy" alt="img" />
        )}
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.info}>
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
            <img src={usersViolet} width={22} height={15} alt="users" />
            <span className={styles.iconsSpan}>{item.members}</span>
          </div>
        </div>
        <p className={styles.p}>На курсе вы узнаете</p>
        <ul className={styles.ul}>
          {domParser(item.description).map((item, index) => {
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
            <span className={styles.bottomViolet}>{item.price + ' руб'}</span>
          </div>
          <div className={styles.bottomItem}>
            <span className={styles.bottomSpan}>Свободных мест</span>
            <span className={styles.bottomViolet}>{item.seats}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link>
          <img src={usersWhite} width={23} height={15} alt="users" loading="lazy" />
        </Link>
        <Link to={`/seminar/${item.id}`}>
          <img
            className={styles.edit}
            width={19}
            height={18}
            src={edit}
            alt="edit"
            loading="lazy"
          />
        </Link>
        <button onClick={() => handleDeleteItem(item.id)}>
          <img src={trash} width={16} height={20} alt="delete" loading="lazy" />
        </button>
      </div>
    </div>
  );
};

export default SignalItem;

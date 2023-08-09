import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './seminarItem.module.scss';
import { getImg, deleteSeminar } from '@service/admin/seminars';
import edit from '@assets/edit.svg';
import trash from '@assets/delete.svg';
import clock from '@assets/clock-violet.svg';
import calendar from '@assets/calendar-violet.svg';
import usersWhite from '@assets/users-white.svg';
import usersViolet from '@assets/users-violet.svg';

const SignalItem = ({ item, setIsDelete }) => {
  const [img, setImg] = useState(null);

  const handleDeleteItem = async (id) => {
    // try {
    //   const response = await deleteSeminar(id);
    //   setIsDelete((prev) => !prev);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // useEffect(() => {
  //   const fetchImg = async () => {
  //     try {
  //       const { data } = await getImg(item.id);
  //       const blob = new Blob([data]);
  //       const url = URL.createObjectURL(blob);

  //       //   var arrayBufferView = new Uint8Array(data);
  //       //   var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
  //       //   var urlCreator = window.URL || window.webkitURL;
  //       //   var imageUrl = urlCreator.createObjectURL(blob);
  //       //   console.log(imageUrl);
  //       setImg(url);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchImg();
  // }, [item.id]);

  return (
    <div key={item.id} className={styles.seminar}>
      <div className={styles.imgWrapper}>
        {img ? <img src={img} width={180} height={114} loading="lazy" alt="Image" /> : ''}
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.info}>
        <div className={styles.icons}>
          <div className={styles.iconsItem}>
            <img src={calendar} width={14} height={15} alt="date" />
            <span className={styles.iconsSpan}>14 мая 2023</span>
          </div>
          <div className={styles.iconsItem}>
            <img src={clock} width={16} height={15} alt="clock" />
            <span className={styles.iconsSpan}>17:00</span>
          </div>
          <div className={styles.iconsItem}>
            <img src={usersViolet} width={22} height={15} alt="users" />
            <span className={styles.iconsSpan}>30</span>
          </div>
        </div>
        <p className={styles.p}>На курсе вы научитесь</p>
        <ul className={styles.ul}>
          <li className={styles.li}>Почему традиционные вложения больше не работают</li>
          <li className={styles.li}>Что сегодня не так с банками и недвижимостью</li>
          <li className={styles.li}>С какой суммы можно начать инвестировать</li>
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

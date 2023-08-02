import { useState, useEffect } from 'react';
import cn from 'classnames';

import styles from './cabinet.module.scss';
import EditCabinet from '../editCabinet/EditCabinet';
import {
  getAvatar,
  setAvatar,
  deleteAvatar,
  getProfile,
  updateProfile,
  deleteProfile,
  getSeminars,
} from '@service/user/profile';
import avatarPng from '@assets/user.png';
import avatarWebp from '@assets/user.webp';
import settings from '@assets/settings-violet.svg';
import clockWhite from '@assets/clock-white.svg';
import usersWhite from '@assets/users-white.svg';
import calendarWhite from '@assets/calendar-white.svg';
import arrow from '@assets/arrow-down.svg';
import premiumWhite from '@assets/premium-white.svg';
import premiumViolet from '@assets/premium-violet.svg';

const Cabinet = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState({});

  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);

  // useEffect(() => {
  //   getAvatar().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <div className={styles.wrapper}>
      {isEditMode === false ? (
        <>
          <div className={styles.top}>
            <div className={styles.imgWrapper}>
              {user.avatarUrl === null ? (
                <picture>
                  <source srcSet={avatarWebp} type="image/webp" />
                  <img
                    className={styles.avatar}
                    src={avatarPng}
                    width={150}
                    height={150}
                    alt="avatar"
                    loading="lazy"
                  />
                </picture>
              ) : (
                <img
                  className={styles.avatar}
                  src={user.avatarUrl}
                  width={150}
                  height={150}
                  alt="avatar"
                  loading="lazy"
                />
              )}
            </div>
            <div className={styles.inner}>
              <h2 className={styles.name}>
                {user.firstName} {user.lastName}
              </h2>
              <button className={styles.btnSettings} onClick={handleToggleEditMode}>
                <img
                  className={styles.imgSettings}
                  src={settings}
                  width={25}
                  height={25}
                  alt="settings"
                />
              </button>
            </div>
            <div className={styles.text}>Базовый аккаунт</div>
          </div>
          <div className={styles.premium}>
            <div className={styles.premiumActive}>
              <div className={styles.premiumActiveTop}>
                <img src={premiumWhite} width={20} height={15} alt="premium" />
                <h3 className={styles.premiumActiveTitle}>Активировать Premium-аккаунт</h3>
              </div>
              <div className={styles.premiumActiveText}>
                Выберите тарифный план и активируйте премиум аккаунт, чтобы иметь доступ ко всем
                функциям, при использовании нашего севиса
              </div>
              <img src={arrow} width={20} height={10} alt="arrow" />
            </div>
            <div className={styles.premiumItem}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumViolet} width={20} height={15} alt="premium" />
                  <h3 className={styles.premiumTitle}>Трейдер</h3>
                </div>
                <div className={styles.premiumRight}>
                  <span className={styles.premiumCost}>500</span>
                  <span className={styles.premiumMonth}>руб/мес</span>
                </div>
              </div>
              <div className={styles.premiumBottom}>
                При активации дает возможность просматривать контент на странице «Сигналы»
              </div>
            </div>
            <div className={styles.premiumItem}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumViolet} width={20} height={15} alt="premium" />
                  <h3 className={styles.premiumTitle}>Инвестор</h3>
                </div>
                <div className={styles.premiumRight}>
                  <span className={styles.premiumCost}>500</span>
                  <span className={styles.premiumMonth}>руб/мес</span>
                </div>
              </div>
              <div className={styles.premiumBottom}>
                При активации дает возможность просматривать контент на странице «Инвестиции»
              </div>
            </div>
            <div className={styles.premiumItem}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumWhite} width={20} height={15} alt="premium-pro" />
                  <h3 className={styles.premiumTitle}>PRO</h3>
                </div>
                <div className={styles.premiumRight}>
                  <span className={styles.premiumCost}>900</span>
                  <span className={styles.premiumMonth}>руб/мес</span>
                </div>
              </div>
              <div className={styles.premiumBottom}>
                При активации открывается доступ
                <span className={styles.premiumBold}>ко всем функциям</span>нашего сервиса
              </div>
            </div>
          </div>
          <div className={styles.seminars}>
            <div className={styles.seminarsTop}>
              <h3 className={styles.seminarsTitle}>Запись на семинары</h3>
              <span className={styles.seminarsCount}>(1)</span>
            </div>
            <div className={styles.seminarsItems}>
              <div className={cn(styles.seminarsItem, styles.netologia)}>
                <h3 className={styles.seminarsItemTitle}>Нетология</h3>
                <div className={styles.seminarsItemInfos}>
                  <div className={styles.seminarsItemInfo}>
                    <img src={calendarWhite} width={12} height={13} alt="date" />
                    <span className={styles.seminarsItemSpan}>14 мая 2023</span>
                  </div>
                  <div className={styles.seminarsItemInfo}>
                    <img src={clockWhite} width={13} height={13} alt="clock" />
                    <span className={styles.seminarsItemSpan}>17:00</span>
                  </div>
                  <div className={styles.seminarsItemInfo}>
                    <img src={usersWhite} width={20} height={13} alt="users" />
                    <span className={styles.seminarsItemSpan}>30</span>
                  </div>
                </div>
                <a
                  className={styles.seminarsItemLink}
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer">
                  Перейти на семинар
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <EditCabinet user={user} setUser={setUser} handleToggleEditMode={handleToggleEditMode} />
      )}
    </div>
  );
};

export default Cabinet;

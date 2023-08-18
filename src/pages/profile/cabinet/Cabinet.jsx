import { useState, useEffect } from 'react';

import styles from './cabinet.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';
import EditCabinet from '../editCabinet/EditCabinet';
import avatarPng from '@assets/user.png';
import avatarWebp from '@assets/user.webp';
import settings from '@assets/settings-violet.svg';
import arrow from '@assets/arrow-down.svg';
import premiumWhite from '@assets/premium-white.svg';
import premiumViolet from '@assets/premium-violet.svg';
import {
  getAvatar,
  getProfile,
  getSeminars,
  getSubscription,
  buySubscription,
} from '@service/user/profile';

const Cabinet = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [img, setImg] = useState(null);
  const [seminars, setSeminars] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isImgDelete, setIsImgDelete] = useState(false);

  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    getSeminars().then((data) => {
      setSeminars(data);
    });
  }, []);

  useEffect(() => {
    getAvatar().then((data) => {
      const blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      setImg(url);
    });
  }, [isImgDelete]);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { subscription } = await getSubscription();
        setSubscription(subscription);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscription();
  }, []);

  const buySubs = async () => {
    try {
      const subscription = 'signals';
      const response = buySubscription(subscription);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isEditMode === false ? (
        <>
          <div className={styles.top}>
            <div className={styles.imgWrapper}>
              {img ? (
                <img
                  className={styles.avatar}
                  src={img}
                  width={150}
                  height={150}
                  alt="avatar"
                  loading="lazy"
                />
              ) : (
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
            <div className={styles.text}>{subscription}</div>
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
            <button className={styles.premiumItem}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumViolet} width={23} height={17} alt="premium" />
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
            </button>
            <button className={styles.premiumItem}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumViolet} width={23} height={17} alt="premium" />
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
            </button>
            <button className={styles.premiumItem} onClick={buySubs}>
              <div className={styles.premiumTop}>
                <div className={styles.premiumLeft}>
                  <img src={premiumWhite} width={23} height={17} alt="premium-pro" />
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
            </button>
          </div>
          <div className={styles.seminars}>
            <div className={styles.seminarsTop}>
              <h3 className={styles.seminarsTitle}>Запись на семинары</h3>
              <span className={styles.seminarsCount}>({seminars.length})</span>
            </div>
            <div className={styles.seminarsItems}>
              {seminars.map((seminar) => {
                return <SeminarItem key={seminar.id} {...seminar} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <EditCabinet
          user={user}
          setUser={setUser}
          img={img}
          setImg={setImg}
          isImgDelete={isImgDelete}
          setIsImgDelete={setIsImgDelete}
          handleToggleEditMode={handleToggleEditMode}
        />
      )}
    </div>
  );
};

export default Cabinet;

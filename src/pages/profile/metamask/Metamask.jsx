import styles from './metamask.module.scss';
import foxPng from '@assets/metaMask.png';
import foxWebp from '@assets/metaMask.webp';

const Metamask = () => {
  return (
    <div className={styles.metamask}>
      <picture>
        <source srcSet={foxWebp} type="image/webp" />
        <img src={foxPng} width={150} height={139} alt="fox" />
      </picture>
      <h2 className={styles.title}>Добро пожаловать</h2>
      <div className={styles.suptitle}>
        Пожалуйста, авторизуйтесь через Ваш криптовалютный кошелек Metamask
      </div>
      <button className={styles.authorization}>Авторизоваться</button>
    </div>
  );
};

export default Metamask;

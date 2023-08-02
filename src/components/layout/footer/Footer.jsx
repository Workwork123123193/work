import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.column}>
            <Link className={styles.logo} to={'/'}>
              <h3 className={styles.logoTitle}>CryptoLife</h3>
              <span className={styles.logoText}>крипто-сообщество</span>
            </Link>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Навигация</h3>
            <nav>
              <ul className={styles.list}>
                <li className={styles.li}>
                  <Link className={styles.link} to={'/'}>
                    Новости
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link className={styles.link} to={'/signals'}>
                    Сигналы
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link className={styles.link} to={'/investments'}>
                    Инвестиции
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link className={styles.link} to={'/seminars'}>
                    Семинары
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Профиль</h3>
            <Link className={styles.link} to={'/profile'}>
              Авторизоваться
            </Link>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Контакты</h3>
            <a className={styles.link} href="mailto:example@mail.ru">
              example@mail.ru
            </a>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Подписаться на рассылку</h3>
            <div className={styles.text}>
              Оставьте Ваш адрес электронной почты, чтобы быть в курсе новостей
            </div>
            <form className={styles.form}>
              <input className={styles.input} type="email" placeholder="E-mail" />
              <button className={styles.btn} type="submit">
                Отправить
              </button>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>© 2023 Все права защищены.</div>
          <a
            className={styles.agree}
            href="http://google.com"
            target="_blank"
            rel="noopener noreferrer">
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

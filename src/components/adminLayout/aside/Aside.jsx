import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './aside.module.scss';
import headerStyles from '../../layout/header/header.module.scss';
import { logout } from '@redux/user/userSlice';
import logo from '@assets/logo.svg';
import { ReactComponent as News } from '@assets/news.svg';
import { ReactComponent as Signals } from '@assets/signals.svg';
import { ReactComponent as Investments } from '@assets/investments.svg';
import { ReactComponent as Seminars } from '@assets/seminars.svg';
import { ReactComponent as Users } from '@assets/users-gray.svg';
import { ReactComponent as Settings } from '@assets/settings-gray.svg';
import { ReactComponent as Exit } from '@assets/exit.svg';

const links1 = [
  { href: '/', name: 'Новости', svg: <News /> },
  { href: '/signals', name: 'Сигналы', svg: <Signals /> },
  { href: '/investments', name: 'Инвестиции', svg: <Investments /> },
  { href: '/seminars', name: 'Семинары', svg: <Seminars /> },
  { href: '/users', name: 'Пользователи', svg: <Users /> },
];

const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <Link className={headerStyles.logo} to={'/'}>
          <img src={logo} alt="CryptoLife" width={45} height={50} />
          <div className={headerStyles.logoRight}>
            <span className={headerStyles.logoTop}>CryptoLife</span>
            <span className={headerStyles.logoBottom}>крипто-сообщество</span>
          </div>
        </Link>
        <ul className={styles.list1}>
          {links1.map((link) => {
            return (
              <li className={styles.listItem} key={link.name}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? cn(styles.listLink, styles.active) : styles.listLink
                  }
                  to={link.href}>
                  <div className={styles.svgWrapper}>{link.svg}</div>
                  <span className={styles.listSpan}>{link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className={styles.list2}>
          <li className={styles.listItem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? cn(styles.listLink, styles.active) : styles.listLink
              }
              to={'/settings'}>
              <Settings />
              <span className={styles.listSpan}>Настройки</span>
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <button className={styles.listLink} onClick={handleLogout}>
              <Exit />
              <span className={styles.listSpan}>Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;

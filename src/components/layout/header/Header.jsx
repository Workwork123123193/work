import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './header.module.scss';
import logo from '@assets/logo.svg';
import { ReactComponent as News } from '@assets/news.svg';
import { ReactComponent as Signals } from '@assets/signals.svg';
import { ReactComponent as Investments } from '@assets/investments.svg';
import { ReactComponent as Seminars } from '@assets/seminars.svg';
import { ReactComponent as Profile } from '@assets/profile.svg';

const links = [
  { href: '/', name: 'Новости', svg: <News /> },
  { href: '/signals', name: 'Сигналы', svg: <Signals /> },
  { href: '/investments', name: 'Инвестиции', svg: <Investments /> },
  { href: '/seminars', name: 'Семинары', svg: <Seminars /> },
  { href: '/profile', name: 'Профиль', svg: <Profile /> },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link className={styles.logo} to={'/'}>
            <img src={logo} alt="CryptoLife" width={45} height={50} />
            <div className={styles.logoRight}>
              <span className={styles.logoTop}>CryptoLife</span>
              <span className={styles.logoBottom}>крипто-сообщество</span>
            </div>
          </Link>
          <nav>
            <ul className={styles.list}>
              {links.map((link) => {
                return (
                  <li className={styles.listItem} key={link.href}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? cn(styles.listLink, styles.active) : styles.listLink
                      }
                      to={link.href}>
                      {link.svg}
                      <span className={styles.listSpan}>{link.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

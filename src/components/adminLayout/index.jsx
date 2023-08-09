import { Outlet } from 'react-router-dom';

import styles from './adminLayout.module.scss';
import Aside from './aside/Aside';
import { Toast } from '../toastContainer/ToastContainer';

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Aside />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Toast />
    </div>
  );
};

export default Layout;

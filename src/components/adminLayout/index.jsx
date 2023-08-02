import { Outlet } from 'react-router-dom';

import Aside from './aside/Aside';
import { Toast } from '../toastContainer/ToastContainer';

const Layout = () => {
  return (
    <>
      <Aside />

      <main>
        <Outlet />
      </main>

      <Toast />
    </>
  );
};

export default Layout;

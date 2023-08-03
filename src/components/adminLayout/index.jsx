import { Outlet } from 'react-router-dom';

import Aside from './aside/Aside';
import { Toast } from '../toastContainer/ToastContainer';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Aside />

      <main>
        <Outlet />
      </main>

      <Toast />
    </div>
  );
};

export default Layout;

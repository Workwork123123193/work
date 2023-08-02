import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Footer from './footer/Footer';
import { Toast } from '../toastContainer/ToastContainer';

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <Toast />
    </>
  );
};

export default Layout;

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import AdminLayout from './components/adminLayout';
import { Preloader } from './components';

import { useSelector } from 'react-redux';

const News = lazy(() => import('./pages/news/News'));
const Signals = lazy(() => import('./pages/signals/Signals'));
const Investments = lazy(() => import('./pages/investments/Investments'));
const Seminars = lazy(() => import('./pages/seminars/Seminars'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

const AdminNews = lazy(() => import('./pages/adminNews/AdminNews'));
const AdminSignals = lazy(() => import('./pages/adminSignals/AdminSignals'));
const AdminSeminars = lazy(() => import('./pages/adminSeminars/AdminSeminars'));

function App() {
  const { data } = useSelector(({ user }) => user);

  console.log(data);
  return (
    <>
      {data === null || data.user.role === 'user' ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            {[
              { path: '/', component: <News /> },
              { path: '/signals', component: <Signals /> },
              { path: '/investments', component: <Investments /> },
              { path: '/seminars', component: <Seminars /> },
              { path: '/profile', component: <Profile /> },
              { path: '*', component: <NotFound /> },
            ].map(({ path, component }) => (
              <Route
                key={path}
                path={path}
                element={<Suspense fallback={<Preloader />}>{component}</Suspense>}
              />
            ))}
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            {[
              { path: '/', component: <AdminNews /> },
              { path: '/signals', component: <AdminSignals /> },
              { path: '/seminars', component: <AdminSeminars /> },
              { path: '*', component: <NotFound /> },
            ].map(({ path, component }) => (
              <Route
                key={path}
                path={path}
                element={<Suspense fallback={<Preloader />}>{component}</Suspense>}
              />
            ))}
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
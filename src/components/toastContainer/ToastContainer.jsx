import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './toastContainer.scss';

export const Toast = () => {
  return <ToastContainer position="bottom-right" autoClose={5000} />;
};

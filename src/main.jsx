import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';

import './globals.scss';
import App from './App.jsx';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from './restore.module.scss';
import styles2 from '../register/register.module.scss';
import { restorePassword } from '@service/user/profile';

const Restore = () => {
  const navigate = useNavigate();
  const [restore, setRestore] = useState('');

  const onRestoreHandler = async (e) => {
    e.preventDefault();
    try {
      const fetchRestore = async () => {
        await restorePassword();
      };

      fetchRestore();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles2.title}>Восстановление пароля</h2>
      <form className={styles2.form} onSubmit={onRestoreHandler}>
        <div className={styles2.item}>
          <input
            className={styles2.input}
            value={restore}
            onChange={(e) => setRestore(e.target.value)}
            type="email"
            name="email"
            placeholder="Адрес электронной почты"
            required
          />
        </div>
        <input className={cn(styles2.btn, styles.btn)} type="submit" />
      </form>
    </div>
  );
};

export default Restore;

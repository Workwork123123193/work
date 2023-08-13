import { useState } from 'react';
import { toast } from 'react-toastify';
import cn from 'classnames';

import styles from '../restore/restore.module.scss';
import styles2 from '../register/register.module.scss';
import { confirmation } from '../../../service/user/profile';

const Confirm = ({ setActiveTab1, setActiveTab2, setIsConfirm, confirmLink }) => {
  const [codeConfirm, setCodeConfirm] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmation(confirmLink, codeConfirm);
      setActiveTab2('null');
      setActiveTab1('login');
      setIsConfirm(false);
      toast('Почта подтверждена');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles2.form} onSubmit={handleConfirm}>
        <div className={styles2.item}>
          <input
            className={styles2.input}
            value={codeConfirm}
            onChange={(e) => setCodeConfirm(e.target.value)}
            placeholder="Код подтверждения"
            type="text"
            name="confirmLink"
          />
        </div>
        <input className={cn(styles2.btn, styles.btn)} type="submit" />
      </form>
    </div>
  );
};

export default Confirm;

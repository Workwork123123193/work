import { Link } from 'react-router-dom';
import styles from '../../adminUsers/buttons/buttons.module.scss';

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <Link to={'/seminars'} className={styles.cancel}>
        Назад к семинару
      </Link>
      <button className={styles.save}>Сохранить изменения</button>
    </div>
  );
};

export default Buttons;

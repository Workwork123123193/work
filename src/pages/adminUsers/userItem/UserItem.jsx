import cn from 'classnames';

import styles from './userItem.module.scss';
import user from '../../../assets/user.png';

const UserItem = ({ email, avatarId, subscription, metamaskAddress, index }) => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.item, styles.number)}>{index}</div>
      <div className={cn(styles.item, styles.avatar)}>
        <img src={user} width={30} height={30} alt="user" />
      </div>
      <div className={cn(styles.item, styles.login)}>{email}</div>
      <div className={cn(styles.item, styles.subscribe)}>{subscription}</div>
      <div className={cn(styles.item, styles.wallet)}>
        {metamaskAddress ? metamaskAddress : 'Отсутствует'}
      </div>
    </div>
  );
};

export default UserItem;

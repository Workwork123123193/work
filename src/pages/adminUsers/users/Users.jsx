import cn from 'classnames';

import UserItem from '../userItem/UserItem';
import styles from './users.module.scss';

const Users = ({ items }) => {
  return (
    <>
      <div className={styles.table}>
        <div className={styles.titles}>
          <div className={cn(styles.title, styles.number)}>№</div>
          <div className={cn(styles.title, styles.avatar)}>Аватар</div>
          <div className={cn(styles.title, styles.login)}>Логин</div>
          <div className={cn(styles.title, styles.subscribe)}>Подписка</div>
          <div className={cn(styles.title, styles.wallet)}>Кошелек</div>
        </div>
        <div className={styles.items}>
          {items.map((user, index) => {
            return <UserItem key={user.id} {...user} index={index + 1} />;
          })}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel}>Отмена</button>
        <button className={styles.save}>Сохранить изменения</button>
      </div>
    </>
  );
};

export default Users;

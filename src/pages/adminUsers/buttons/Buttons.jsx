import styles from './buttons.module.scss';

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.cancel}>Отмена</button>
      <button className={styles.save}>Сохранить изменения</button>
    </div>
  );
};

export default Buttons;

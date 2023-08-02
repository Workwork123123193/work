import styles from './preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderSpinner}></div>
    </div>
  );
};

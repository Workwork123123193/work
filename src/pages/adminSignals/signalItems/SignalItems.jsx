import styles from './signalItems.module.scss';

import SignalItem from '../signatItem/SignalItem';

const SignalItems = ({ items, setIsDelete }) => {
  return (
    <div className={styles.signals}>
      {items?.length
        ? items.map((item) => {
            return <SignalItem key={item.id} item={item} setIsDelete={setIsDelete} />;
          })
        : 'Сигналов нету'}
    </div>
  );
};

export default SignalItems;

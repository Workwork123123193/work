import styles from '../../adminSignals/signalItems/signalItems.module.scss';

import Item from '../item/Item';

const SignalItems = ({ items, setIsDelete }) => {
  return (
    <div className={styles.signals}>
      {items?.length
        ? items.map((item) => {
            return <Item key={item.id} item={item} setIsDelete={setIsDelete} />;
          })
        : 'Сигналов нету'}
    </div>
  );
};

export default SignalItems;

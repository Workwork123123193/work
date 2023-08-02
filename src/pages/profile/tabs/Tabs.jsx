import styles from './tabs.module.scss';
import cn from 'classnames';

const tabs = [
  { label: 'Логин', id: 'login' },
  { label: 'Metamask', id: 'metamask' },
];

const Tabs = ({ activeTab1, handleTabChange1 }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(styles.tab, {
            [styles.active]: activeTab1 === tab.id,
          })}
          onClick={() => handleTabChange1(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

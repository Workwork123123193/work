import styles from './seminarItems.module.scss';
import SeminarItem from '../seminarItem/SeminarItem';

const SeminarItems = ({ items, setIsDelete }) => {
  return (
    <div className={styles.seminars}>
      {items?.length
        ? items.map((item) => {
            return <SeminarItem key={item.title} item={item} setIsDelete={setIsDelete} />;
          })
        : 'Семинаров нету'}
    </div>
  );
};

export default SeminarItems;

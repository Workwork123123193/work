import { useSelector } from 'react-redux';

import styles from '../signals/signals.module.scss';
import Items from './items/Items';
import blank1 from '@assets/blank-1.jpg';
import blank2 from '@assets/blank-2.jpg';

const Investments = () => {
  const { data } = useSelector(({ user }) => user);

  return (
    <section className="section">
      <div className="container">
        {!data || data?.user?.subscription === 'none' ? (
          <div className={styles.blank}>
            <img src={blank1} width={523} height={613} alt="img" />
            <img src={blank2} width={523} height={313} alt="img" />
          </div>
        ) : (
          <Items />
        )}
      </div>
    </section>
  );
};

export default Investments;

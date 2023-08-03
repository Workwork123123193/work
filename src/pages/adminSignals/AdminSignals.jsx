import { useState, useEffect } from 'react';

import styles from './adminSiglans.module.scss';
import Actions from './actions/Actions';
import CreateSignal from './createSignal/CreateSignal';
import { getSignals } from '@service/admin/signals';

const AdminSignals = () => {
  const [tabs, setTabs] = useState('signals');
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');

  // const { data, isLoading } = useGetProductsQuery({
  //   sort: sort.sort,
  //   search,
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSignals();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="admin-section">
      {tabs === 'signals' ? (
        <Actions setTabs={setTabs} setSort={setSort} setSearch={setSearch} />
      ) : (
        <CreateSignal setTabs={setTabs} />
      )}
    </section>
  );
};

export default AdminSignals;

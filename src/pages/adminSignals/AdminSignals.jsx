import { useState, useEffect } from 'react';

import Actions from './actions/Actions';
import CreateSignal from './createSignal/CreateSignal';
import SignalItems from './signalItems/SignalItems';
import { getSignals } from '@service/admin/signals';

const AdminSignals = () => {
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState('signals');
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSignals();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [tabs, isDelete]);

  return (
    <section className="admin-section">
      {tabs === 'signals' ? (
        <>
          <Actions setTabs={setTabs} setSort={setSort} setSearch={setSearch} count={data.count} />
          <SignalItems items={data.items} setIsDelete={setIsDelete} />
        </>
      ) : (
        <CreateSignal setTabs={setTabs} />
      )}
    </section>
  );
};

export default AdminSignals;

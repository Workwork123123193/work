import { useState, useEffect } from 'react';

import Actions from './actions/Actions';
import CreateInvestment from './createInvestment/CreateInvestment';
import Items from './items/Items';
import { getInvestments } from '@service/admin/investments';

const AdminSignals = () => {
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState('investments');
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvestments();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [tabs, isDelete]);

  return (
    <section className="admin-section">
      {tabs === 'investments' ? (
        <>
          <Actions setTabs={setTabs} setSort={setSort} setSearch={setSearch} count={data.count} />
          <Items items={data.items} setIsDelete={setIsDelete} />
        </>
      ) : (
        <CreateInvestment setTabs={setTabs} />
      )}
    </section>
  );
};

export default AdminSignals;

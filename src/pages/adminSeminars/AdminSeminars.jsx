import { useState, useEffect } from 'react';

import Actions from './actions/Actions';
import CreateSeminar from './createSeminar/CreateSeminar';
import SeminarItems from './seminarItems/SeminarItems';
import { getSeminars } from '@service/admin/seminars';

const AdminSeminars = () => {
  const [data, setData] = useState({
    count: 3,
    items: [{ title: 'test1' }, { title: 'test2' }, { title: 'test3' }],
  });
  const [tabs, setTabs] = useState('seminars');
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getSeminars();
  //       console.log(response);
  //       setData(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [tabs, isDelete]);

  return (
    <section className="admin-section">
      {tabs === 'seminars' ? (
        <>
          <Actions setTabs={setTabs} setSort={setSort} setSearch={setSearch} count={data.count} />
          <SeminarItems items={data.items} setIsDelete={setIsDelete} />
        </>
      ) : (
        <CreateSeminar setTabs={setTabs} />
      )}
    </section>
  );
};

export default AdminSeminars;

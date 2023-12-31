import { useState, useEffect } from 'react';

import Actions from './actions/Actions';
import Users from './users/Users';
import Buttons from './buttons/Buttons';
import { getUsers } from '@service/admin/users';

const AdminUsers = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data.length]);

  return (
    <section className="admin-section">
      <Actions setSort={setSort} setSearch={setSearch} count={data.length} />
      <Users items={data} back="users" />
      <Buttons />
    </section>
  );
};

export default AdminUsers;

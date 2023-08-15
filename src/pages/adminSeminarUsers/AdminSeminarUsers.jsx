import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Actions from './actions/Actions';
import Users from '../adminUsers/users/Users';
import Buttons from './buttons/Buttons';
import { getSeminarUsers } from '@service/admin/seminars';

const AdminSeminarUsers = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSeminarUsers(id);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="admin-section">
      <Actions setSort={setSort} setSearch={setSearch} count={data.length} />
      <Users items={data} />
      <Buttons />
    </section>
  );
};

export default AdminSeminarUsers;

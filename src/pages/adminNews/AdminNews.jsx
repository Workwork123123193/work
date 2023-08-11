import { useState, useEffect } from 'react';

import Actions from './actions/Actions';
import CreateNews from './createNews/CreateNews';
import NewsItems from './newsItems/NewsItems';
import { getNews } from '@service/admin/news';

const AdminNews = () => {
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState('news');
  const [sort, setSort] = useState({ sort: 'date', order: 'desc' });
  const [search, setSearch] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNews();
        setData(response);
        console.log("news:", response)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [tabs, isDelete, data.count]);

  return (
    <section className="admin-section">
      {tabs === 'news' ? (
        <>
          <Actions setTabs={setTabs} setSort={setSort} setSearch={setSearch} count={data.count} />
          <NewsItems items={data.items} setIsDelete={setIsDelete} />
        </>
      ) : (
        <CreateNews setTabs={setTabs} />
      )}
    </section>
  );
};

export default AdminNews;

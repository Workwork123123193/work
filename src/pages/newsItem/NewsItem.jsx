import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NewsItem = () => {
  const { id } = useParams();
  const [data, setData] = useState(id);

  useEffect(() => {}, []);

  return (
    <section className="section">
      <div className="container">{data}</div>
    </section>
  );
};

export default NewsItem;

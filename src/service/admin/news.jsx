import { authClient } from '../client';

const getNews = async () => {
  const { data } = await authClient().get(`news?page=12`);
  return data;
};

const createImg = async ({ id, imageUrl }) => {
  let form = new FormData();
  form.append('file', imageUrl);
  const { data } = await authClient().post(`news/${id}/image`, imageUrl);
  return data;
};

const createNews = async (obj) => {
  const { data } = await authClient().post(`news/forcePull`, obj);
  return data;
};

export { getNews, createNews, createImg };

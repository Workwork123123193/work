import { authClient, authClientPostMedia, authClientGetMedia } from '../client';

const getSeminars = async () => {
  const { data } = await authClient().get(`seminar?page=1`);
  return data;
};

const getSeminarUsers = async (id) => {
  const { data } = await authClient().get(`seminar/${id}/users`);
  return data;
};

const getSeminar = async (id) => {
  const { data } = await authClient().get(`seminar/${id}`);
  return data;
};

const createSeminar = async (obj) => {
  const { data } = await authClient().post(`seminar`, obj);
  return data;
};

const updateSeminar = async (id, obj) => {
  const { data } = await authClient().put(`seminar/${id}`, obj);
  return data;
};

const deleteSeminar = async (id) => {
  const { data } = await authClient().delete(`seminar/${id}`);
  return data;
};

const createImg = async ({ id, imageUrl }) => {
  console.log(id, imageUrl);
  let form = new FormData();
  form.append('file', imageUrl);

  const data = await authClientPostMedia().post(`seminar/${id}/image`, form);
  return data;
};

const getImg = async (id) => {
  const data = await authClientGetMedia().get(`seminar/${id}/image`);
  return data;
};

const deleteImg = async (id) => {
  const data = await authClient().delete(`seminar/${id}/image`);
  return data;
};

export {
  getSeminars,
  getSeminarUsers,
  getSeminar,
  createSeminar,
  getImg,
  createImg,
  deleteImg,
  updateSeminar,
  deleteSeminar,
};

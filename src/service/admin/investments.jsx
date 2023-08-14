import { authClient, authClientPostMedia, authClientGetMedia } from '../client';

const getInvestments = async () => {
  const { data } = await authClient().get(`investment?page=1`);
  return data;
};

const getInvestment = async (id) => {
  const { data } = await authClient().get(`investment/${id}`);
  return data;
};

const createInvestment = async (obj) => {
  const { data } = await authClient().post(`investment`, obj);
  return data;
};

const updateInvestment = async (id, obj) => {
  const { data } = await authClient().put(`investment/${id}`, obj);
  return data;
};

const deleteInvestment = async (id) => {
  const { data } = await authClient().delete(`investment/${id}`);
  return data;
};

const createImg = async ({ id, imageUrl }) => {
  let form = new FormData();
  form.append('file', imageUrl);

  const data = await authClientPostMedia().post(`investment/${id}/image`, form);
  return data;
};

const getImg = async (id) => {
  const data = await authClientGetMedia().get(`investment/${id}/image`);
  return data;
};

const deleteImg = async (id) => {
  const data = await authClient().delete(`investment/${id}/image`);
  return data;
};

const createVoice = async (id, voiceUrl) => {
  console.log(id, voiceUrl);
  let form = new FormData();
  form.append('file', voiceUrl);
  const data = await authClientPostMedia().post(`investment/${id}/voice`, form);
  return data;
};

const getVoice = async (id) => {
  const data = await authClientGetMedia().get(`investment/${id}/voice`);
  return data;
};

const deleteVoice = async (id) => {
  console.log(id);
  const data = await authClient().delete(`investment/${id}/voice`);
  return data;
};

export {
  getInvestment,
  getInvestments,
  getImg,
  createImg,
  deleteImg,
  getVoice,
  createVoice,
  deleteVoice,
  createInvestment,
  deleteInvestment,
  updateInvestment,
};

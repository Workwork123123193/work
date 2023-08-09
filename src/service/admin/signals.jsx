import {
  authClient,
  authClientPostImg,
  authClientGetImg,
  authClientGetVoice,
  authClientPostVoice,
} from '../client';

const getSignals = async () => {
  const { data } = await authClient().get(`signal?page=1`);
  return data;
};

const getSignal = async (id) => {
  const { data } = await authClient().get(`signal/${id}`);
  return data;
};

const createSignall = async (obj) => {
  const { data } = await authClient().post(`signal`, obj);
  return data;
};

const updateSignall = async (id, obj) => {
  const { data } = await authClient().put(`signal/${id}`, obj);
  return data;
};

const deleteSignal = async (id) => {
  const { data } = await authClient().delete(`signal/${id}`);
  return data;
};

const createImg = async ({ id, imageUrl }) => {
  console.log(id, imageUrl);
  let form = new FormData();
  form.append('file', imageUrl);

  const data = await authClientPostImg().post(`signal/${id}/image`, form);
  return data;
};

const getImg = async (id) => {
  const data = await authClientGetImg().get(`signal/${id}/image`);
  return data;
};

const deleteImg = async (id) => {
  const data = await authClient().delete(`signal/${id}/image`);
  return data;
};

const createVoice = async ({ id, voiceUrl }) => {
  let form = new FormData();
  form.append('file', voiceUrl);
  const data = await authClientPostVoice().post(`signal/${id}/voice`, form);
  return data;
};

const getVoice = async (id) => {
  const data = await authClientGetVoice().get(`signal/${id}/voice`);
  return data;
};

const deleteVoice = async (id) => {
  const data = await authClient().delete(`signal/${id}/voice`);
  return data;
};

export {
  getSignal,
  getSignals,
  getImg,
  createImg,
  deleteImg,
  getVoice,
  createVoice,
  deleteVoice,
  createSignall,
  deleteSignal,
  updateSignall,
};
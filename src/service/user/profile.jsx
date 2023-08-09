import { authClient, authClientPostImg, authClientGetImg } from '../client';

const getAvatar = async () => {
  const { data } = await authClientGetImg().get(`profile/avatar`);
  return data;
};

const setAvatar = async (payload) => {
  let img = new FormData();
  img.append('file', payload);

  const { data } = await authClientPostImg().post(`profile/avatar`, img);
  return data;
};

const deleteAvatar = async () => {
  const { data } = await authClient().delete(`profile/avatar`);
  return data;
};

const getProfile = async () => {
  const { data } = await authClient().get(`profile`);
  return data;
};

const updateProfile = async (payload) => {
  const { data } = await authClient().put(`profile`, payload);
  return data;
};

const deleteProfile = async () => {
  const { data } = await authClient().delete(`profile`);
  return data;
};

const getSeminars = async () => {
  const { data } = await authClient().delete(`profile/seminars`);
  return data;
};

export {
  getAvatar,
  setAvatar,
  deleteAvatar,
  getProfile,
  updateProfile,
  deleteProfile,
  getSeminars,
};

import { client, authClient, authClientPostMedia, authClientGetMedia } from '../client';

const getAvatar = async () => {
  const { data } = await authClientGetMedia().get(`profile/avatar`);
  return data;
};

const setAvatar = async (payload) => {
  let img = new FormData();
  img.append('file', payload);

  const { data } = await authClientPostMedia().post(`profile/avatar`, img);
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
  const { data } = await authClient().get(`profile/seminars`);
  return data;
};

const getSubscription = async () => {
  const { data } = await authClient().get(`subscription`);
  return data;
};

const buySubscription = async (subscription) => {
  const params = new URLSearchParams();
  params.append('subscription', subscription);
  const data = await authClient().get(`subscription/buy?${params.toString()}e`);
  return data;
};

const confirmation = async (confirmLink, codeConfirm) => {
  const data = await client.post(`${confirmLink}${codeConfirm}`);
  return data;
};

const restorePassword = async () => {
  const data = await client.post(`auth/restorePassword`);
  return data;
};

export {
  getAvatar,
  setAvatar,
  deleteAvatar,
  getProfile,
  updateProfile,
  deleteProfile,
  getSubscription,
  buySubscription,
  confirmation,
  getSeminars,
  restorePassword,
};

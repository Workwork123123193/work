import { authClient } from '../client';

const getUsers = async () => {
  const { data } = await authClient().get(`user`);
  return data;
};

const getUser = async (id) => {
  const { data } = await authClient().get(`user/${id}`);
  return data;
};

const changeStatus = async (id) => {
  const { data } = await authClient().put(`user${id}`);
  return data;
};

export { getUsers, getUser, changeStatus };

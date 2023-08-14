import { client, authClient } from '../client';

const getSeminars = async () => {
  const { data } = await client.get(`seminar?page=1`);
  return data;
};

const buySeminar = async (id) => {
  const { data } = await authClient().post(`seminar/${id}/addUser`);
  return data;
};

export { getSeminars, buySeminar };

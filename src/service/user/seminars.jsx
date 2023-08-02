import { client } from '../client';

const getSeminars = async () => {
  const { data } = await client.get(`seminar?page=1`);
  return data;
};

export { getSeminars };

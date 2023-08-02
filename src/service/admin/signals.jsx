import { authClient } from '../client';

const getSignals = async () => {
  const { data } = await authClient().get(`signal`);
  return data;
};

export { getSignals };

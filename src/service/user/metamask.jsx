import { client, authClient } from '../client';

const getConnect = async () => {
  const data = await authClient().get(`profile/connectMetamask`);
  return data;
};

const postConnect = async (payload) => {
  let form = new FormData();
  form.append('data', payload);

  const data = await client.post(`profile/connectMetamask`, form);
  return data;
};

const getLogin = async () => {
  const data = await authClient().get(
    `auth/login/metamask?metamaskAddress=0x048aae2f307d7c306fc72249cea505e69001d684`,
  );
  return data;
};

const postLogin = async (userAddress, signature) => {
  let form = new FormData();
  form.append('accountAddress', userAddress);
  form.append('signature', signature);
  const data = await client.post(`auth/login/metamask`, form);
  return data;
};

export { getConnect, postConnect, getLogin, postLogin };

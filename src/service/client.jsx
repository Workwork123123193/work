import axios from 'axios';
import { getToken } from './token';

const base = 'http://45.12.72.86:3001/';

const client = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authClient = () => {
  return axios.create({
    baseURL: base,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

const authClientPostVoice = () => {
  return axios.create({
    baseURL: base,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

const authClientGetVoice = () => {
  return axios.create({
    baseURL: base,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: "arraybuffer",
  });
};

const authClientPostImg = () => {
  return axios.create({
    baseURL: base,
    headers: {
      filename: 'image.jpeg',
      contentType: 'image/jpeg',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

const authClientGetImg = () => {
  return axios.create({
    baseURL: base,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: "arraybuffer",
  });
};

export {
  client,
  authClient,
  authClientGetVoice,
  authClientPostVoice,
  authClientPostImg,
  authClientGetImg,
};

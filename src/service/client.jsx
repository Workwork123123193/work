import axios from 'axios';
import { getToken } from './token';

export const client = axios.create({
  baseURL: 'http://45.12.72.86:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = () => {
  return axios.create({
    baseURL: 'http://45.12.72.86:3000/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  });
};

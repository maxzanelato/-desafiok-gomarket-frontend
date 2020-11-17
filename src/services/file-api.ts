import axios from 'axios';

const fileApi = axios.create({
  baseURL: 'http://localhost:3333/v1',
});

fileApi.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('@GoMarket:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.ContentType = 'multipart/form-data';

  return config;
});

export default fileApi;

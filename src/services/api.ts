import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/v1',
});

api.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('@GoMarket:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

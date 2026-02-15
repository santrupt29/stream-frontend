import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  
  const isInternalRequest = config.url.startsWith('/') || config.url.includes(process.env.NEXT_PUBLIC_BACKEND_URL);
  
  if (token && isInternalRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  
  // Only add the token if the request is going to your Spring Boot backend
  const isInternalRequest = config.url.startsWith('/') || config.url.includes('localhost:8080');
  
  if (token && isInternalRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
import api from './api';
import Cookies from 'js-cookie';

const API_URL = "http://localhost:8080";

export const authService = {
  
  async login(email, password) {
    try {
      const response = await api.post(`${API_URL}/login`, { email, password });
      
      // Assuming your backend returns a plain string token or { token: "..." }
      const token = response.data.token || response.data;

      if (token) {
        // Store in cookies. 
        // expires: 1 means 1 day. 
        // secure: true ensures it only sends over HTTPS (disable for localhost testing if needed)
        Cookies.set('auth_token', token, { 
          expires: 1, 
          path: '/',
          sameSite: 'strict' 
        });
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || "Login failed";
    }
  },

  async register(email, password) {
    try {
      const response = await api.post(`${API_URL}/register`, {
        email,
        password
      });
      window.location.href = "/login";
    } catch (error) {
      
    }

  },
  logout() {
    Cookies.remove('auth_token');
    window.location.href = "/login";
  },

  getToken() {
    return Cookies.get('auth_token');
  }
};
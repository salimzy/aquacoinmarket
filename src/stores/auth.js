

import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const error = ref(null);
  const loading = ref(false);

  const setUser = (userData) => {
    user.value = userData;
  };

  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const login = async (credentials) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('https://api.aquacoinx.com/auth/login', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const signup = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('https://api.aquacoinx.com/auth/signup', userData);
      setToken(response.data.token);
      setUser(response.data.user);
      return true;
    } catch (err) {
      error.value = err.response?.data?.message || 'Signup failed';
      return false;
    } finally {
      loading.value = false;
    }
  };

  return { user, token, error, loading, login, signup, clearAuth };
});

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  register: async (name, email, password, role) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  verifyOTP: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },
  resendOTP: async (email) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  },
  google: async (code) => {
    const response = await api.post('/auth/google', { code });
    return response.data;
  },
  github: async (code) => {
    const response = await api.post('/auth/github', { code });
    return response.data;
  },
};

// AI API calls
export const aiAPI = {
  generateIdea: async (data) => {
    const response = await api.post('/ai/generate-idea', data);
    return response.data;
  },
  analyzeStartup: async (data) => {
    const response = await api.post('/ai/analyze-startup', data);
    return response.data;
  },
  generateRoadmap: async (data) => {
    const response = await api.post('/ai/roadmap', data);
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/ai/history');
    return response.data;
  },
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};

// Contact API calls
export const contactAPI = {
  sendMessage: async (name, email, message) => {
    const response = await api.post('/contact', { name, email, message });
    return response.data;
  },
};

export default api;

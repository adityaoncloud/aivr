import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://15.207.98.77:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/api/auth/register', { username, email, password });
    return response.data;
  },
};

export const files = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (filename: string) => {
    const response = await api.delete(`/api/files/${filename}`);
    return response.data;
  },
  list: async () => {
    const response = await api.get('/api/files');
    return response.data;
  },
};

export const chat = {
  send: async (content: string, sessionId: string) => {
    const response = await api.post('/api/chat', {message:{ content, session_id: sessionId }});
    return response.data;
  },
  getHistory: async (sessionId: string) => {
    const response = await api.get(`/api/chat/history/${sessionId}`);
    return response.data;
  },
};
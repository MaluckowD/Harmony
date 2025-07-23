import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cold-cougars-sort.loca.lt/';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://cold-cougars-sort.loca.lt/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
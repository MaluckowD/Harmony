import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tame-rings-laugh.loca.lt/';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://tame-rings-laugh.loca.lt/',
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
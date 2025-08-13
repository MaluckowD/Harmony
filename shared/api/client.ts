import axios from 'axios';
import { getCookie } from 'cookies-next';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://185.185.70.48:8081/';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://185.185.70.48:8081/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
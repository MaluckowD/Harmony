import axios from 'axios';
import { getCookie } from 'cookies-next';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://chatty-grapes-sink.loca.lt/';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://chatty-grapes-sink.loca.lt/',
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
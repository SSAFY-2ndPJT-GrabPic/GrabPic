import axios, { AxiosInstance } from "axios";

const baseURL = 'https://j10d104.p.ssafy.io/api';

axios.defaults.withCredentials = true;

export const noneApi: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'access': `${localStorage.getItem('accessToken')}`,
  },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['access'] = `${token}`;
  }
  return config;
});


export const formDataApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'access': `${localStorage.getItem('accessToken')}`,
  },
});

formDataApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['access'] = `${token}`;
  }
  return config;
});

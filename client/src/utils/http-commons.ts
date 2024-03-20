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
    // 'Access-Control-Allow-Origin': '*',
    // 'Content-Type': 'application/json',
    'access': `${localStorage.getItem('accessToken')}`,
  },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['AUTH-TOKEN'] = `${token}`;
  }
  return config;
});

export const joinApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

export const textApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'text/plain',
  }
});

export const authtokenApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'AUTH-TOKEN': `${localStorage.getItem('token')}`,
  }
})

authtokenApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['AUTH-TOKEN'] = `${token}`;
  }
  return config;
});

export const profileImgApi: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'AUTH-TOKEN': `${localStorage.getItem('token')}`,
  },
});

profileImgApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['AUTH-TOKEN'] = `${token}`;
  }
  return config;
});

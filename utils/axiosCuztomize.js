import axios from 'axios';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://3.25.199.238:8000/',
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log('res succ')
    return response && response.data ? response.data : response;
  },
  function (error) {
    console.log('res err')
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default instance;

import axios from 'axios';
import queryString from 'query-string';
import { apiUrl } from '../constances/dev/apiUrl';

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosClient.interceptors.response.use((response) => {
  return {status: response.status, data: response.data}
}, (error) => {
  throw error;
});

export default axiosClient;
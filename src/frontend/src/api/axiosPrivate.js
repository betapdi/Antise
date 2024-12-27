import axios from 'axios';
import queryString from 'query-string';
import { apiUrl } from '../constances/dev/apiUrl';

const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
  },
});

axiosPrivate.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  //console.log(token);
  config.headers['Authorization'] = 'Bearer ' + token;
  
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosPrivate.interceptors.response.use((response) => {
  return {status: response.status, data: response.data}
}, (error) => {
  throw error;
});

export default axiosPrivate;
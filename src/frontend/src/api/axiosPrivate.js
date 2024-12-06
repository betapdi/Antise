import axios from 'axios';
import queryString from 'query-string';

const axiosPrivate = axios.create({
  baseURL: "http://172.28.102.169:8080/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, {arrayFormat: 'brackets'})
  },
});

axiosPrivate.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  config.headers['Authorization'] = 'Bearer ' + token;
  
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosPrivate.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosPrivate;
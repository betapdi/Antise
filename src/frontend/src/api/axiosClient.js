import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: "http://172.28.102.169:8080/api/v1",
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
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosClient;
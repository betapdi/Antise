import axiosClient from "./axiosClient"
import axiosPrivate from "./axiosPrivate";

const userApi = {
  loginUser: (rawData) => {
    const url = '/auth/login';
    return axiosClient.post(url, rawData);
  },

  registerUser: (rawData) => {
    const url = '/auth/register';
    return axiosClient.post(url, rawData);
  },

  getUserData: () => {
    const url = '/user/get';
    return axiosPrivate.get(url);
  },
  getAllUsers: () => {
    const url = '/user/getAll';
    return axiosPrivate.get(url);
  },

  
}

export default userApi;
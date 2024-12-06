import axiosClient from "./axiosClient"

const userApi = {
  loginUser: (rawData) => {
    const url = '/auth/login'
    return axiosClient.post(url, rawData);
  },

  registerUser: (rawData) => {
    const url = '/auth/register'
    return axiosClient.post(url, rawData);
  }
}

export default userApi;
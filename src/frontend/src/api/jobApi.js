import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const jobApi = {
  createJob: (rawData) => {
    const url = '/job/create';

    // Convert rawData to FormData
    const formData = new FormData();
    formData.append('job', new Blob([JSON.stringify(rawData)], { type: 'application/json' }));

    // Send as multipart/form-data
    return axiosPrivate.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllJobs: () => {
    const url = 'public/job/getAll';
    return axiosClient.get(url);
  },

  getJob: (id) => {
    const url = `/job/get/${id}`;
    return axiosClient.get(url);
  },
}

export default jobApi;
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
    const url = `public/job/get/${id}`;
    return axiosClient.get(url);
  },

  searchJob: (searchData) => {
    const url = 'public/job/search';
    const formData = new FormData();
    formData.append('searchData', new Blob([JSON.stringify(searchData)], { type: 'application/json' }));
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  applyJob: (rawData) => {
    const url = '/job/apply';
    const formData = new FormData();
    formData.append('application', new Blob([JSON.stringify(rawData)], { type: 'application/json' }));
    return axiosPrivate.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteJob: (jobId) => {
    const url = `/job/delete/${jobId}`;
    return axiosPrivate.delete(url);
  },

}

export default jobApi;
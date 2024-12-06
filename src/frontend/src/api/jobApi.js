import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const jobApi = {
    createCompany: (rawData) => {
        const url = '/company/create';
      
        // Convert rawData to FormData
        const formData = new FormData();
        formData.append('company', new Blob([JSON.stringify(rawData)], {type: 'application/json'}));
      
        // Send as multipart/form-data
        return axiosPrivate.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    },

    createJob: (rawData) => {
        const url = '/job/create';
      
        // Convert rawData to FormData
        const formData = new FormData();
        formData.append('job', rawData);
      
        // Send as multipart/form-data
        return axiosPrivate.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    },

}

export default jobApi;
import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const jobApi = {
    createCompany: (rawData) => {
        const url = '/company/create';
      
        // Convert rawData to FormData
        const formData = new FormData();
        for (const key in rawData) {
          if (Object.prototype.hasOwnProperty.call(rawData, key)) {
            formData.append(key, rawData[key]);
          }
        }
      
        // Send as multipart/form-data
        return axiosPrivate.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    },

}

export default jobApi;
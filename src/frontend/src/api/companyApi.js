import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const companyApi = {
    createCompanyAccount: (rawData) => {
        const url = '/company/create';
        return axiosPrivate.post(url);
    },

    editCompany: (rawData) => {
        const url = '/company/edit';
      
        // Convert rawData to FormData
        const formData = new FormData();
        formData.append('company', new Blob([JSON.stringify(rawData)], {type: 'application/json'}));
      
        // Send as multipart/form-data
        return axiosPrivate.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    }
}

export default companyApi;
import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const applicantApi = {
    createApplicantAccount: () => {
        const url = '/applicant/create';
        return axiosPrivate.post(url);
    },

    editApplicant: (rawData) => {
        const url = '/applicant/edit';
      
        // Convert rawData to FormData
        const formData = new FormData();
        formData.append('applicant', new Blob([JSON.stringify(rawData)], {type: 'application/json'}));
      
        // Send as multipart/form-data
        return axiosPrivate.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    }
}

export default applicantApi;
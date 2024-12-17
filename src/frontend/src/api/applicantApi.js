import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const applicantApi = {
    createApplicantAccount: () => {
        const url = '/applicant/create';
        return axiosPrivate.post(url);
    },

    editApplicant: (rawData) => {
        const url = '/applicant/edit';

        const formData = new FormData();
        const applicant = {};

        for (let key in rawData) {
          if (key === "resume") {
            formData.append('resume', rawData[key]);
          }

          else if (key === "profilePicture") {
            formData.append('profileImage', rawData[key]);
          }

          else applicant[key] = rawData[key];
        }
      
        formData.append('applicant', new Blob([JSON.stringify(applicant)], {type: 'application/json'}));
      
        // Send as multipart/form-data
        return axiosPrivate.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    }
}

export default applicantApi;
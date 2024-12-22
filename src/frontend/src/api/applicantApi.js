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

      else if (key === "gender") {
        const value = parseInt(rawData[key]);
        applicant[key] = value;
      }

      else applicant[key] = rawData[key];
    }

    formData.append('applicant', new Blob([JSON.stringify(applicant)], { type: 'application/json' }));

    // Send as multipart/form-data
    return axiosPrivate.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getResume: (fileName) => {
    const url = fileName + "/details"
    return axiosPrivate.get(url);
  },

  addFavoriteJob: (id) => {
    const url = `/applicant/addFavoriteJob/${id}`;
    const formData = new FormData();
    formData.append('job', new Blob([JSON.stringify(id)], { type: 'application/json' }));
    return axiosPrivate.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  removeFavoriteJob: (id) => {
    const url = `/applicant/removeFavoriteJob/${id}`;
    return axiosPrivate.delete(url);
  },

  getAppliedJob: () => {
    const url = '/applicant/getAppliedJobs';
    return axiosPrivate.get(url);
  },
}

export default applicantApi;
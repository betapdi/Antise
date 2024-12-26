import axiosClient from "./axiosClient"

import axiosPrivate from "./axiosPrivate"

const companyApi = {
  createCompanyAccount: (rawData) => {
    const url = '/company/create';
    return axiosPrivate.post(url);
  },

  editCompany: (rawData) => {
    const url = '/company/edit';

    const formData = new FormData();
    const company = {};

    for (let key in rawData) {
      if (key === "bannerImage") {
        formData.append('banner', rawData[key]);
      }

      else if (key === "logoImage") {
        formData.append('logo', rawData[key]);
      }

      else company[key] = rawData[key];
    }

    formData.append('company', new Blob([JSON.stringify(company)], { type: 'application/json' }));

    // Send as multipart/form-data
    return axiosPrivate.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCompany: (id) => {
    const url = `public/company/get/${id}`;
    return axiosClient.get(url);
  },

  getAllCompanies: () => {
    const url = 'public/company/getAll';
    return axiosClient.get(url);
  },

  searchCompany: (searchPattern) => {
    const url = `public/company/search/${searchPattern}`;
    return axiosClient.post(url);
  },

  addSavedApplication: (id) => {
    console.log(id);
    const url = `/company/saveApplication`;
    const formData = new FormData();
    formData.append('applicationId', new Blob([JSON.stringify(id)], { type: 'application/json' }));
    return axiosPrivate.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },


  // removeSavedApplication: (id) => {
  //   const url = `/company/removeSavedApplication`;

  // },

  removeSavedApplication: (id) => {
    const url = `/company/removeSavedApplication`;
    const formData = new FormData();
    formData.append('applicationId', id);
    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
  }
}

export default companyApi;
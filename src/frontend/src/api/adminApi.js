import axiosPrivate from "./axiosPrivate"
const adminApi = {
    getWebStats: () => {
        const url = '/admin/getWebStats';
        return axiosPrivate.get(url);
    },
    verifyCompany: (companyId) => {
        const url = `/admin/verifyCompany/${companyId}`;
        return axiosPrivate.post(url);
    },
    deleteUser: (userId) => {
        const url = `/admin/deleteUser/${userId}`;
        return axiosPrivate.delete(url);
    },

}
export default adminApi;
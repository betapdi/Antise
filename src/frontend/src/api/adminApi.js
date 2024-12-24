import axiosPrivate from "./axiosPrivate"
const adminApi = {
    getWebStats: () => {
        const url = '/admin/getWebStats';
        return axiosPrivate.get(url);
    },
    verifyCompany: (companyId) => {
        const url = `/admin/verifyCompany/${companyId}`;
        return axiosPrivate.post(url);
    }
}
export default adminApi;
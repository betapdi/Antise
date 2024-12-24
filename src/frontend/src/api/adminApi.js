import axiosPrivate from "./axiosPrivate"
const adminApi = {
    getWebStats: () => {
        const url = '/admin/getWebStats';
        return axiosPrivate.get(url);
    }
}
export default adminApi;
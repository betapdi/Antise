import axiosClient from "./axiosClient";
import axiosPrivate from "./axiosPrivate";

const applicationApi = {
    getApplication: (applicationId) => {
        const url = `/application/get/${applicationId}`;
        return axiosPrivate.get(url);
    },
}

export default applicationApi;
import axios, { AxiosError } from 'axios'

const token = localStorage.getItem('token')
export const axiosInstance = axios.create({
    baseURL: 'http://api.coms-messaging-21078062.com/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.code === "451") {
        return Promise.reject(error);

    }
    return Promise.reject(error);
});
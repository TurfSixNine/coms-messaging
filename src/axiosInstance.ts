import axios, { AxiosError } from 'axios'

const token = localStorage.getItem('token')
export const axiosInstance = axios.create({
    baseURL: 'http://ec2-100-24-9-198.compute-1.amazonaws.com:5000/',
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
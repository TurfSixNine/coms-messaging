import axios, { AxiosError } from 'axios'

const token = localStorage.getItem('token')

let url : string | undefined  = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = process.env.REACT_APP_DEV_URL
}else{
        url= process.env.REACT_APP_PROD_URL
}

export const axiosInstance = axios.create({
    baseURL: url,
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

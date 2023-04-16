import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true, // This is necessary for CSRF protection with Sanctum
});
axios.defaults.baseURL = "http://localhost:8000/";

export default api;

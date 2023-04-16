import axios from 'axios';
const baseURL = import.meta.env.BACKEND_URL || 'http://localhost:8000';

console.log(baseURL);

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, // This is necessary for CSRF protection with Sanctum
});
axios.defaults.baseURL = baseURL;

export default api;

// src/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true, // This is necessary for CSRF protection with Sanctum
});

export default api;

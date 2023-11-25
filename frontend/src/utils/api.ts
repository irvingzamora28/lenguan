import axios from "axios";
import Config from "./config";

let baseURL = Config.getBaseUrl();

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

axios.defaults.baseURL = baseURL;

export default api;

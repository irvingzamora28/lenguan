import axios from "axios";
import Config from "./config";

let baseURL = Config.getBaseUrl();

const api = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

// Use interceptor to set the XSRF token before each request
api.interceptors.request.use(
	(config) => {
		// Ensure this runs in a browser environment
		if (typeof document !== "undefined") {
			const tokenElement = document.querySelector('meta[name="csrf-token"]');
			const token = tokenElement?.getAttribute("content")?.replace("%3D", "=");
			if (token) {
				config.headers["X-XSRF-TOKEN"] = token;
			}
		}
		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);
axios.defaults.baseURL = baseURL;

export default api;

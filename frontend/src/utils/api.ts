import axios from "axios";
let baseURL;

// This checks if the code is running in a Node.js environment.
// In Node.js, environment variables are accessed through `process.env`
if (typeof process !== "undefined" && process.env) {
	// If `process.env.BACKEND_URL` is defined, use it. Otherwise, fall back to 'http://localhost:8000'
	baseURL = process.env.BACKEND_URL || "http://localhost:8000";
}
// This checks if the code is running in an ESM environment (like the browser with Vite).
// In such environments, environment variables are accessed through `import.meta.env`
else if (typeof import.meta !== "undefined") {
	// If `import.meta.env.BACKEND_URL` is defined, use it. Otherwise, fall back to 'http://localhost:8000'
	baseURL = import.meta.env.BACKEND_URL || "http://localhost:8000";
} else {
	// If neither of the above checks pass, throw an error as the environment is not recognized.
	throw new Error("Environment not recognized");
}

console.log(baseURL);

const api = axios.create({
	baseURL: baseURL,
	// This is necessary for CSRF protection when using Laravel Sanctum
	withCredentials: true,
});

axios.defaults.baseURL = baseURL;

export default api;

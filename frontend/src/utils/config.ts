class Config {
    static getBaseUrl() {
        // Check if running in a Node.js environment
        if (typeof process !== "undefined" && process.env) {
            return process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
        }
        // Check if running in an ESM environment (like the browser with Vite)
        else if (typeof import.meta !== "undefined") {
            return import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
        }
        // If neither environment is detected, throw an error
        else {
            throw new Error("Environment not recognized");
        }
    }
}

export default Config;

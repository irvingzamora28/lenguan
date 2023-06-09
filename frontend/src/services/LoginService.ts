import api from "./../utils/api";
import { refreshCsrfToken } from "./../utils/csrf-token";

interface LoginData {
	email: string;
	password: string;
}

export class LoginService {
	static async login(loginData: LoginData) {
		try {
			const response = await api.post("/api/login", loginData);
			return response;
		} catch (error) {
			console.error(error);
			throw error; // propagate the error up
		}
	}

	static async refreshToken() {
		try {
			await refreshCsrfToken();
		} catch (error) {
			console.error(error);
			throw error; // propagate the error up
		}
	}
}

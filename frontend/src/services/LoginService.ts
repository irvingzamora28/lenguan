import api from "./../utils/api";
import { refreshCsrfToken } from "./../utils/csrf-token";

interface LoginData {
	email: string;
	password: string;
}

export class LoginService {
	static async login(loginData: LoginData) {
		return await api.post("/api/login", loginData);
	}

	static refreshToken() {
		refreshCsrfToken();
	}
}

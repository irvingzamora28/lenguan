import { User } from "../types";
import api from "./../utils/api";
import { refreshCsrfToken } from "./../utils/csrf-token";

// TODO: Avoid duplicate here and useUserRegister hook
interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	guest_data: string | null;
}

export class RegisterService {
	static async register(registerData: RegisterData) {
		try {
			const response = await api.post("/api/register", registerData);
			return response;
		} catch (error) {
			console.error(error);
			throw error; // propagate the error up
		}
	}

	// TODO: Remove from LoginService and RegisterService and use directly
	static async refreshToken() {
		try {
			await refreshCsrfToken();
		} catch (error) {
			console.error(error);
			throw error; // propagate the error up
		}
	}
}

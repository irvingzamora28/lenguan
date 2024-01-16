import { ContactFormData } from "../types/form.ts";
import api from "../utils/api.ts";

export class FormSubmitService {
	public static async submit(formData: ContactFormData): Promise<any> {
		try {
			const response = await api.post(`/api/form/contact`, formData);
			return response;
		} catch (error) {
			console.error("Error fetching goals:", error);
			throw error;
		}
	}
}

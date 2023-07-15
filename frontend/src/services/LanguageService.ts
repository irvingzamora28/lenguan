import { Language } from "../types/language.ts";
import api from "../utils/api.ts";
import { setLanguages } from "../redux/languageSlice.ts";
import { RootState } from "../redux/store.ts";
import { useSelector, useDispatch } from "react-redux";
import { useLanguages } from "../redux/hooks.ts";

export class LanguageService {
	public static async fetchLanguages(): Promise<Language[]> {
		try {
			const response = await api.get("/api/languages");
			const data: Language[] = await response.data;
			// LanguageService.storeLanguages(data);
			console.log("fetchLanguages");
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error fetching languages:", error);
			throw error;
		}
	}

	private static storeLanguages(languages: Language[]): void {
		const dispatch = useDispatch();
		dispatch(setLanguages(languages));
	}
}

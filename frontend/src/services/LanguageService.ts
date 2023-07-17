import { Language } from "../types/language.ts";
import api from "../utils/api.ts";
import { setLanguages } from "../redux/languageSlice.ts";
import { AppDispatch, RootState } from "../redux/store.ts";
import { useSelector, useDispatch } from "react-redux";
import { useLanguages } from "../redux/hooks.ts";

export class LanguageService {
	public static async fetchLanguages(dispatch: AppDispatch): Promise<Language[]> {
		try {
			const response = await api.get("/api/languages");
			const data: Language[] = await response.data;
			dispatch(setLanguages(data));
			console.log("fetchLanguages");
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error fetching languages:", error);
			throw error;
		}
	}
}

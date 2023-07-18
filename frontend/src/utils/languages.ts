import { Language } from "../types/language";
import { useEffect } from "react";
import { LanguageService } from "../services/LanguageService";
import { AppDispatch } from "../redux/store";

export const getLanguages = (languages: Language[] | null, dispatch: AppDispatch) => {
	useEffect(() => {
		const fetchLanguages = async () => {
			if (!Array.isArray(languages) || languages.length === 0) {
				await LanguageService.fetchLanguages(dispatch);
			}
		};

        fetchLanguages();
        return () => {};
	}, []);
};

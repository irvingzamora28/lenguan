import { useIsGuest } from "../redux/hooks";
import { LanguageService } from "../services/LanguageService";

export const useAuthProtectionService = () => {
	const isGuest = useIsGuest();

	const updateLanguage = async (languageId: string, request: any) => {
		if (isGuest) {
			console.log("Guest users are not allowed to perform this operation.");
		} else {
			return LanguageService.updateLanguage(languageId, request);
		}
	};

	// Return all protected methods
	return {
		updateLanguage,
	};
};

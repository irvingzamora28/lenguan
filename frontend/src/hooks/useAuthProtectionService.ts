import { useIsGuest } from "../redux/hooks";
import { CourseService } from "../services/CourseService";
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

	const updateCourse = async (courseId: string, request: any) => {
		if (isGuest) {
			console.log("Guest users are not allowed to perform this operation.");
		} else {
			return CourseService.updateCourse(courseId, request);
		}
	};

	// Return all protected methods
	return {
		updateLanguage,
		updateCourse,
	};
};

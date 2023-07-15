import { Language } from "./language";

export interface LanguageState {
	selectedLanguage: string | null;
    languages: Language[] | null;
	courseProgress: {
		[courseId: string]: number; // Pretending progress is a percentage for now
	};
}

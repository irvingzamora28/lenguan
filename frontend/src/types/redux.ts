export interface LanguageState {
	selectedLanguage: string | null;
	courseProgress: {
		[courseId: string]: number; // Pretending progress is a percentage for now
	};
}

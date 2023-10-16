import { Course } from "./course";
import { Language } from "./language";

export interface LanguageState {
	selectedLanguage: Language | null;
    languages: Language[] | null;
	courseProgress: {
		[courseId: string]: number; // Pretending progress is a percentage for now
	};
}

export interface CourseState {
	selectedCourse: Course | null;
    courses: Course[] | null;
}

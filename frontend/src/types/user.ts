import { Course } from "./course";
import { Language } from "./language";

export interface User {
	id: number;
	name: string;
	username?: string;
	learning_language?: Language;
	native_language_code: string;
	course?: Course;
	email: string;
	profile_image_path?: string;
}

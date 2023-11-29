import { Course } from "./course";
import { Language } from "./language";

export interface User {
	id: number;
	name: string;
	username?: string;
	language?: Language;
    native_language_code: string;
	course?: Course;
	email: string;
    image: string;
    profile_image_path: string;
}

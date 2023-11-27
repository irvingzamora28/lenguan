import { Course } from "./course";
import { Language } from "./language";

export interface User {
	id: number;
	name: string;
	username?: string;
	language?: Language;
	course?: Course;
	email: string;
    image: string;
    profile_image_path: string;
}

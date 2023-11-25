import { Language } from "./language";

export interface User {
	id: number;
	name: string;
	username?: string;
	language?: Language;
	email: string;
    image: string;
    profile_image_path: string;
}

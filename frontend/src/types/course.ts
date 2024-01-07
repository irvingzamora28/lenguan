import { Language } from "./language";

// TODO: Remove language_id and start using language._id
export interface Course {
	_id: string;
	name: string;
	image: string;
	language_id: string;
	language: Language;
	native_language_code: string;
	description: string;
	updated_at: string;
	created_at: string;
	level_ids?: string[];
}

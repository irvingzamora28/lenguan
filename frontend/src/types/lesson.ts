import { Goal } from "./goal";

export interface Lesson {
	_id: string;
	image: string;
    lesson_number: number;
	name: string;
	description: string;
	progress: number;
	goals: Goal[];
}

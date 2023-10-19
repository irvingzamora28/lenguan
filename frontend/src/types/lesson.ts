import { Goal } from "./goal";

export interface Lesson {
	_id: string;
	image: string;
	name: string;
	description: string;
	progress: number;
	goals: Goal[];
}

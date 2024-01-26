export interface VocabularyExercice {
	id?: string;
	prompt: string;
	options?: string[];
	answer: string;
	lesson_id?: string;
}

export interface LessonExercises {
	exercise_types: string[];
	exercises: any[];
}

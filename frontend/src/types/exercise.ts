export interface VocabularyExercice {
	id?: string;
	prompt: string;
	options?: string[];
	answer: string;
	lesson_id?: string;
}

export interface GrammarExercise {
	id?: string;
	prompt: string;
	options?: string[];
	answer: string;
	explanation: string;
	lesson_id?: string;
}

export interface SentenceExercise {
	prompt: string;
	answer: string;
	explanation: string;
}

export interface LessonExercises {
	exercise_types: string[];
	exercises: any[];
}

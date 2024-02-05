import { Lesson } from "./lesson";

export interface VocabularyExercise {
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

export type Conjugation = { pronoun: string; conjugation: string };
export type VerbConjugation = { verb: string; tense: string; conjugations: Conjugation[] };

export interface VerbConjugationExercise {
	id?: string;
	verb: string;
	tenses: string[];
	pronouns: string[];
	conjugations: VerbConjugation[];
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
	lesson: Lesson;
}

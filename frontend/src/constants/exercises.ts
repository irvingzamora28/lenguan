import { GRAMMAR_EXERCISE_SENTENCE_CORRECTION_PATH, VERB_CONJUGATION_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH, VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH } from "./routes";

export const EXERCISE_TYPES: { [key: string]: { type: string; title: string; icon: string; default_url: string } } = {
	ListeningExercise: {
		type: "ListeningExercise",
		title: "Listening Exercises",
		icon: "🎧",
		default_url: "",
	},
	VocabularyExercise: {
		type: "VocabularyExercise",
		title: "Vocabulary Exercises",
		icon: "🔠",
		default_url: VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH,
	},
	GrammarExercise: {
		type: "GrammarExercise",
		title: "Grammar Exercises",
		icon: "🔎",
		default_url: GRAMMAR_EXERCISE_SENTENCE_CORRECTION_PATH,
	},
	WritingExercise: {
		type: "WritingExercise",
		title: "Writing Exercises",
		icon: "✍️",
		default_url: "",
	},
	VerbConjugationExercise: {
		type: "VerbConjugationExercise",
		title: "Verb Conjugation Exercises",
		icon: "🎰",
		default_url: VERB_CONJUGATION_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH,
	},
	PronunciationExercise: {
		type: "PronunciationExercise",
		title: "Pronunciation Exercises",
		icon: "🎤",
		default_url: "",
	},
};

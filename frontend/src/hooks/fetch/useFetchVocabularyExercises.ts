import { useEffect, useState } from "react";
import { ExercisesService } from "../../services/ExerciseService";
import { VocabularyExercise } from "../../types/exercise";

export const useFetchVocabularyExercises = (courseId: string, lessonNumber: string, shouldFetch = true): [VocabularyExercise[], string | null] => {
	const [vocabularyExercises, setVocabularyExercises] = useState<VocabularyExercise[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!shouldFetch) return;
		const fetchData = async () => {
			try {
				const fetchedVocabularyExercises = await ExercisesService.fetchVocabularyExercises(courseId, lessonNumber);

				if (!fetchedVocabularyExercises.length) {
					setError("Error fetching VocabularyExercises. Please try again later.");
				} else {
					setVocabularyExercises(fetchedVocabularyExercises);
				}
			} catch (err) {
				console.error("Error fetching VocabularyExercises:", err);
				setError("Error fetching VocabularyExercises. Please try again later.");
			}
		};
		fetchData();
	}, [lessonNumber, shouldFetch]);

	return [vocabularyExercises, error];
};

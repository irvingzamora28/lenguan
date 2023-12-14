import { useEffect, useState } from "react";
import { ExercisesService } from "../../services/ExerciseService";
import { VocabularyExercice } from "../../types/exercise";

export const useFetchVocabularyExercises = (lessonNumber?: string): [VocabularyExercice[], string | null] => {
	const [vocabularyExercises, setVocabularyExercises] = useState<VocabularyExercice[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedVocabularyExercises = await ExercisesService.fetchVocabularyExercises(lessonNumber);

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
	}, [lessonNumber]);

	return [vocabularyExercises, error];
};

import { useEffect, useState } from "react";
import { ExercisesService } from "../../services/ExerciseService";
import { VerbConjugationExercise } from "../../types/exercise";

export const useFetchVerbConjugationExercises = (courseId: string, lessonNumber: string, shouldFetch = true): [VerbConjugationExercise[], string | null] => {
	const [verbConjugationExercises, setVerbConjugationExercises] = useState<VerbConjugationExercise[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!shouldFetch) return;
		const fetchData = async () => {
			try {
				const fetchedVerbConjugationExercises = await ExercisesService.fetchVerbConjugationExercises(courseId, lessonNumber);

				if (!fetchedVerbConjugationExercises.length) {
					setError("Error fetching VerbConjugationExercises. Please try again later.");
				} else {
					setVerbConjugationExercises(fetchedVerbConjugationExercises);
				}
			} catch (err) {
				console.error("Error fetching VerbConjugationExercises:", err);
				setError("Error fetching VerbConjugationExercises. Please try again later.");
			}
		};
		fetchData();
	}, [lessonNumber, shouldFetch]);

	return [verbConjugationExercises, error];
};

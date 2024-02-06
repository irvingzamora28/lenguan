import { useEffect, useState } from "react";
import { ExercisesService } from "../../services/ExerciseService";
import { GrammarExercise } from "../../types/exercise";

export const useFetchGrammarExercises = (courseId: string, lessonNumber: string, shouldFetch = true): [GrammarExercise[], string | null] => {
	const [grammarExercises, setGrammarExercises] = useState<GrammarExercise[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!shouldFetch) return;
		const fetchData = async () => {
			try {
				const fetchedGrammarExercises = await ExercisesService.fetchGrammarExercises(courseId, lessonNumber);

				if (!fetchedGrammarExercises.length) {
					setError("Error fetching GrammarExercises. Please try again later.");
				} else {
					setGrammarExercises(fetchedGrammarExercises);
				}
			} catch (err) {
				console.error("Error fetching GrammarExercises:", err);
				setError("Error fetching GrammarExercises. Please try again later.");
			}
		};
		fetchData();
	}, [lessonNumber, shouldFetch]);

	return [grammarExercises, error];
};

import { useEffect, useState } from "react";
import { ExercisesService } from "../../services/ExerciseService";
import { LessonExercises } from "../../types/exercise";

export const useFetchExercises = (courseId: string, lessonNumber: string): [LessonExercises | null, string | null] => {
	const [exercises, setExercises] = useState<LessonExercises | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedExercises = await ExercisesService.fetchLessonExercises(courseId, lessonNumber);
				if (!fetchedExercises) {
					setError("Error fetching exercises. Please try again later.");
				} else {
					setExercises(fetchedExercises);
				}
			} catch (err) {
				console.error("Error fetching exercises:", err);
				setError("Error fetching exercises. Please try again later.");
			}
		};
		fetchData();
	}, [courseId]);

	return [exercises, error];
};

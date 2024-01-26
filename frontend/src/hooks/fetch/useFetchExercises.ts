// Create a hook that has different methods to retrieve different types of exercises, like vocabulary exercises, grammar exercises, etc
import { ExercisesService } from "../../services/ExerciseService";
import { useState, useEffect } from "react";

export const useFetchExercises = () => {
	const fetchAllExercises = async (courseId: string, lessonNumber: string) => {
		try {
			console.log(lessonNumber);
			const fetchedExercises = await ExercisesService.fetchLessonExercises(courseId, lessonNumber);
			return fetchedExercises;
		} catch (error) {
			throw error;
		}
	};

	return { fetchAllExercises };
};

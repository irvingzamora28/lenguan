import { LessonExercises, VocabularyExercise } from "../types/exercise";
import api from "../utils/api";

export class ExercisesService {
	public static async fetchVocabularyExercises(lessonNumber?: string): Promise<VocabularyExercise[]> {
		if (!lessonNumber) {
			throw new Error("Lesson number is required to fetch exercises.");
		}
		try {
			const response = await api.get(`/api/vocabulary-exercises/${lessonNumber}`);
			const data: VocabularyExercise[] = await response.data.data;
			return data;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			throw error;
		}
	}

	public static async fetchLessonExercises(courseId: string, lessonNumber: string): Promise<LessonExercises> {
		if (!lessonNumber) {
			throw new Error("Lesson number is required to fetch exercises.");
		}
		if (!courseId) {
			throw new Error("Course ID is required to fetch exercises.");
		}
		try {
			const response = await api.get(`/api/exercises/all`, {
				params: {
					course_id: courseId,
					lesson_number: lessonNumber,
				},
			});
			const data: LessonExercises = await response.data;
			return data;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			throw error;
		}
	}
}

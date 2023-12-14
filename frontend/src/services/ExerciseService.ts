import { VocabularyExercice } from "../types/exercise";
import api from "../utils/api";

export class ExercisesService {
	public static async fetchVocabularyExercises(lessonNumber?: string): Promise<VocabularyExercice[]> {
		if (!lessonNumber) {
			throw new Error("Lesson number is required to fetch exercises.");
		}
		try {
			const response = await api.get(`/api/vocabulary-exercises/${lessonNumber}`);
			const data: VocabularyExercice[] = await response.data.data;
			return data;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			throw error;
		}
	}
}

import api from "../utils/api.ts";
import { Goal } from "../types/goal.ts";

export class GoalService {
	public static async fetchGoals(languageId?: string): Promise<Goal[]> {
		if (!languageId) {
			throw new Error("Goal ID is required to fetch lessons.");
		}
		try {
			const response = await api.get(`/api/goals/${languageId}`);
			const data: Goal[] = await response.data;
			return data;
		} catch (error) {
			console.error("Error fetching goals:", error);
			throw error;
		}
	}
}

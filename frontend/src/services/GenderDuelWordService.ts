import api from "../utils/api.ts";

interface Word {
	word: string;
	gender: string;
	translation: string;
	difficulty_level: number;
	category: string;
}

export class GenderDuelWordService {
	private static words: Word[] = [];

	public static async fetchWords(): Promise<void> {
		try {
			const response = await api.get("/api/nouns");
			const data: Word[] = await response.data;
			GenderDuelWordService.words = data;
		} catch (error) {
			console.error("Error fetching words:", error);
			throw error;
		}
	}

	public static getRandomWord(): Word | null {
		if (GenderDuelWordService.words.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * GenderDuelWordService.words.length);
		return GenderDuelWordService.words[randomIndex];
	}
}

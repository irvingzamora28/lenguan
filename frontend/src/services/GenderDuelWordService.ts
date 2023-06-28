import { Word } from "../types/player.ts";
import api from "../utils/api.ts";

export class GenderDuelWordService {
	private static words: Word[] = [];
	private static currentIndex: number = 0;

	public static async fetchWords(quantity: number): Promise<void> {
		try {
			const response = await api.get(`/api/nouns/gender-duel?quantity=${quantity}`);
			const data: Word[] = await response.data;
			GenderDuelWordService.words = data;
			GenderDuelWordService.currentIndex = 0; // reset index when new words are fetched
		} catch (error) {
			console.error("Error fetching words:", error);
			throw error;
		}
	}

	public static getNextWord(): Word | null {
		if (GenderDuelWordService.words.length === 0) {
			return null;
		}

        // If for some reason index is over word's list, reset index
        if (GenderDuelWordService.currentIndex >= GenderDuelWordService.words.length) {
            GenderDuelWordService.currentIndex = 0;
        }

		const word = GenderDuelWordService.words[GenderDuelWordService.currentIndex];
		GenderDuelWordService.currentIndex += 1; // increment the index for the next call

		return word;
	}

	public static getRandomWord(): Word | null {
		if (GenderDuelWordService.words.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * GenderDuelWordService.words.length);
		return GenderDuelWordService.words[randomIndex];
	}
}

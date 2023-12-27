import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { GenderDuelWordService } from "./../../services/GenderDuelWordService";
import api from "./../../utils/api";
import { Word } from "../../types";

// Mock your api module
vi.mock("./../../utils/api");

describe("GenderDuelWordService", () => {
	const mockWords: Word[] = [
		{
			word: "house",
			gender: "neutral",
			translation: "Haus",
			difficulty_level: 1,
			category: "basic",
		},
		{
			word: "dog",
			gender: "male",
			translation: "Hund",
			difficulty_level: 1,
			category: "animals",
		},
	];

	const mockApiResponse = { data: mockWords };

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches words from API", async () => {
		(api.get as Mock).mockResolvedValue(mockApiResponse);

		await GenderDuelWordService.fetchWords(2, "languageid");

		// Expect that the mocked API.get method was called with correct URL
		expect(api.get).toHaveBeenCalledWith("/api/nouns/gender-duel?quantity=2&language_id=languageid");
	});

	it("gets next word in order", async () => {
		// Mock the fetchWords method to set words and reset currentIndex
		(api.get as Mock).mockResolvedValue(mockApiResponse);

		await GenderDuelWordService.fetchWords(2, "languageid");

		const firstWord = GenderDuelWordService.getNextWord();

		expect(firstWord).toEqual(mockWords[0]);

		const secondWord = GenderDuelWordService.getNextWord();
		expect(secondWord).toEqual(mockWords[1]);
	});

	it("gets random word", async () => {
		// Mock the fetchWords method to set words and reset currentIndex
		(api.get as Mock).mockResolvedValue(mockApiResponse);

		await GenderDuelWordService.fetchWords(2, "languageid");

		const word = GenderDuelWordService.getRandomWord();
		expect(word).toBeInstanceOf(Object);
		expect(word).toHaveProperty("word");
		expect(word).toHaveProperty("gender");
		expect(word).toHaveProperty("translation");
		expect(word).toHaveProperty("difficulty_level");
		expect(word).toHaveProperty("category");
	});
});

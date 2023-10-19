import { describe, it, beforeEach, vi } from "vitest";
import api from "../../utils/api.ts";
import { LanguageService } from "../../services/LanguageService.ts";
import { setLanguages } from "../../redux/languageSlice.ts";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

vi.mock("../../utils/api");

describe("LanguageService", () => {
	const mockLanguageData = [
		{ _id: "1", name: "English", code: "en" },
		{ _id: "2", name: "Spanish", code: "es" },
		{ _id: "3", name: "French", code: "fr" },
	];

	const mockApiResponse = {
		data: mockLanguageData,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		(api.get as any).mockResolvedValue(mockApiResponse); // Mock the api.get method
	});

	it("should call the API and dispatch the received data when fetchLanguages is called", async () => {
		const mockDispatch = vi.fn() as unknown as ThunkDispatch<any, undefined, AnyAction> & ((action: AnyAction) => any);

		await LanguageService.fetchLanguages(mockDispatch);

		expect(api.get).toHaveBeenCalledWith("/api/languages");
		expect(mockDispatch).toHaveBeenCalledWith(setLanguages(mockLanguageData));
	});

	it("should log and rethrow an error when the API request fails", async () => {
		const mockError = new Error("API request failed");
		(api.get as any).mockRejectedValue(mockError);
		console.error = vi.fn(); // Mock the console.error method

		const mockDispatch = vi.fn() as unknown as ThunkDispatch<any, undefined, AnyAction> & ((action: AnyAction) => any);

		await expect(LanguageService.fetchLanguages(mockDispatch)).rejects.toThrow("API request failed");
		expect(console.error).toHaveBeenCalledWith("Error fetching languages:", mockError);
	});
});

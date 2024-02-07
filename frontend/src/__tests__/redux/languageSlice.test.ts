import { Language } from "../../types/language";
import { LanguageState } from "../../types/redux";
import { languageSlice } from "./../../redux/languageSlice";

describe("languageSlice", () => {
	let initialState: LanguageState;

	beforeEach(() => {
		initialState = {
			languages: null,
			selectedLanguage: null,
			courseProgress: {},
		};
	});

	it("should handle setLanguage", () => {
		const mockLanguage: Language = {
			_id: "some_id",
			name: "French",
			code: "fr",
			special_characters: ["é", "è", "ê", "â", "ç", "à"],
		};

		const actual = languageSlice.reducer(initialState, languageSlice.actions.setLanguage(mockLanguage));
		expect(actual.selectedLanguage).toEqual(mockLanguage);
	});

	it("should handle setCourseProgress", () => {
		const actual = languageSlice.reducer(initialState, languageSlice.actions.setCourseProgress({ courseId: "1", progress: 70 }));
		expect(actual.courseProgress["1"]).toEqual(70);
	});
});

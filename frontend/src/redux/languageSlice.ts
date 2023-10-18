import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageState } from "../types/redux";
import { Language } from "../types/language";

const initialState: LanguageState = {
	selectedLanguage: null,
	languages: null,
	courseProgress: {},
};

export const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.selectedLanguage = { ...action.payload };
		},
		setCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
			state.courseProgress[action.payload.courseId] = action.payload.progress;
		},
		setLanguages: (state, action: PayloadAction<Language[]>) => {
			state.languages = action.payload;
		},
		resetLanguageState: (state) => {
			return initialState;
		},
	},
});

export const { setLanguage, setCourseProgress, setLanguages, resetLanguageState } = languageSlice.actions;

export default languageSlice.reducer;

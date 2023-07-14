import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageState } from "../types/redux";

const initialState: LanguageState = {
	selectedLanguage: null,
	courseProgress: {},
};

export const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<string>) => {
			state.selectedLanguage = action.payload;
		},
		setCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
			state.courseProgress[action.payload.courseId] = action.payload.progress;
		},
	},
});

export const { setLanguage, setCourseProgress } = languageSlice.actions;

export default languageSlice.reducer;

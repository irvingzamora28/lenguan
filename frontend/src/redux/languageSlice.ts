import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  selectedLanguage: string | null;
  courseProgress: {
    [courseId: string]: number; // Pretending progress is a percentage for now
  };
}

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
    setCourseProgress: (state, action: PayloadAction<{ courseId: string, progress: number }>) => {
      state.courseProgress[action.payload.courseId] = action.payload.progress;
    },
  },
});

export const { setLanguage, setCourseProgress } = languageSlice.actions;

export default languageSlice.reducer;

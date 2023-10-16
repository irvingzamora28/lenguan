import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseState } from "../types/redux";
import { Course } from "../types/course";

const initialState: CourseState = {
	selectedCourse: null,
	courses: null,
};

export const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		setCourse: (state, action: PayloadAction<Course>) => {
			state.selectedCourse = { ...action.payload };
		},
        setCourses: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
	},
});

export const { setCourse, setCourses } = courseSlice.actions;

export default courseSlice.reducer;

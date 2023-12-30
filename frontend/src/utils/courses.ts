import { Course } from "../types/course";
import { useEffect } from "react";
import { CourseService } from "../services/CourseService";
import { AppDispatch } from "../redux/store";
import { Language } from "../types/language";

export const getCourses = (courses: Course[] | null, language: Language | null, dispatch: AppDispatch) => {
	useEffect(() => {
		const fetchCourses = async () => {
			if ((!Array.isArray(courses) || courses.length === 0) && language) {
				await CourseService.fetchCourses(language._id, dispatch);
			}
		};

		fetchCourses();
		return () => {};
	}, []);
};

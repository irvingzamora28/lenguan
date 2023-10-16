import { Course } from "../types/course";
import { useEffect } from "react";
import { CourseService } from "../services/CourseService";
import { AppDispatch } from "../redux/store";

export const getCourses = (courses: Course[] | null, dispatch: AppDispatch) => {
	useEffect(() => {
		const fetchCourses = async () => {
			if (!Array.isArray(courses) || courses.length === 0) {
				await CourseService.fetchCourses(dispatch);
			}
		};

        fetchCourses();
        return () => {};
	}, []);
};

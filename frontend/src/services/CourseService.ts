import { Course } from "../types/course.ts";
import api from "../utils/api.ts";
import { setCourses } from "../redux/courseSlice.ts";
import { AppDispatch, RootState } from "../redux/store.ts";

export class CourseService {
	public static async fetchCourses(dispatch: AppDispatch): Promise<Course[]> {

		try {
			const response = await api.get("/api/courses");
			const data: Course[] = await response.data;
			dispatch(setCourses(data));
			console.log("fetchCourses");
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error fetching courses:", error);
			throw error;
		}
	}
}

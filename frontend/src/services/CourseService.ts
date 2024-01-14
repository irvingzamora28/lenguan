import { Course } from "../types/course.ts";
import api from "../utils/api.ts";
import { setCourses } from "../redux/courseSlice.ts";
import { AppDispatch, RootState } from "../redux/store.ts";
import { Lesson } from "../types/lesson.ts";

export class CourseService {
	public static async fetchCourses(dispatch: AppDispatch): Promise<Course[]> {
		try {
			const response = await api.get(`/api/courses`);
			const data: Course[] = await response.data;
			dispatch(setCourses(data));
			return data;
		} catch (error) {
			console.error("Error fetching courses:", error);
			throw error;
		}
	}

	public static async fetchLessons(courseId?: string): Promise<Lesson[]> {
		if (!courseId) {
			throw new Error("Course ID is required to fetch lessons.");
		}
		try {
			const response = await api.get(`/api/courses/${courseId}/lessons`);
			const data: Lesson[] = await response.data;
			return data;
		} catch (error) {
			console.error("Error fetching lessons:", error);
			throw error;
		}
	}

	public static async updateCourse(courseId: string, postRequest: Function): Promise<any> {
		try {
			const response = await postRequest(
				"/api/user/course",
				{ course_id: courseId, _method: "PUT" },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error updating course:", error);
			throw error;
		}
	}
}

import { useState, useEffect } from "react";
import { Lesson } from "../../types/lesson";
import { CourseService } from "../../services/CourseService";

export const useFetchLessons = (courseId?: string): [Lesson[], string | null] => {
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedLessons = await CourseService.fetchLessons(courseId);
				console.log("fetchedLessons", fetchedLessons);

				setLessons(fetchedLessons);
			} catch (err) {
				console.error("Error fetching lessons:", err);
				setError("Error fetching lessons. Please try again later.");
			}
		};
		fetchData();
	}, [courseId]);

	return [lessons, error];
};

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Course } from "../../types/course";
import { setCourse } from "../../redux/courseSlice";
import { getCourses } from "../../utils/courses";
import { useCourses } from "../../redux/hooks";

const SelectCoursePage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const courses = useCourses();
	const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    // Fetch the courses available to select
	getCourses(courses, dispatch);

	// useEffect(() => {
	//     const fetchCourses = async () => {
	//         const fetchedCourses = await getCourses();
	//         setCourses(fetchedCourses);
	//     };
	//     fetchCourses();
	// }, []);

	const selectCourse = (course: Course) => {
		dispatch(setCourse(course));
		navigate("/lessons");
	};

	return (
		<Layout>
			<h2 className="text-2xl font-bold mb-6">Select a Course</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{courses &&
					Array.isArray(courses) &&
					courses.map((course, index) => (
						<div key={course._id} onClick={() => selectCourse(course)} className="course-box">
							<img src={course.image} alt={course.name} />
							<h3>{course.name}</h3>
							<p>{course.description}</p>
						</div>
					))}
			</div>
		</Layout>
	);
};

export default SelectCoursePage;

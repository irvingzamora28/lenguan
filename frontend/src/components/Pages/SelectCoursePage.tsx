import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Course } from "../../types/course";
import { setCourse } from "../../redux/courseSlice";
import { getCourses } from "../../utils/courses";
import { useCourses, useUser } from "../../redux/hooks";
import { User } from "../../types";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/api/useApi";
import { updateAuthUser } from "../../redux/authSlice";

const SelectCoursePage: React.FC = () => {
	const dispatch = useDispatch();
	const user = useUser();
	const navigate = useNavigate();
	const courses = useCourses();
	const { postRequest } = useApi();

	// Fetch the courses available to select
	getCourses(courses, dispatch);

	const updateLanguageInBackend = async (updatedUser: User) => {
		try {
			const response = await postRequest(
				"/api/user/course",
				{ course_id: updatedUser.course?._id, _method: "PUT" },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success("Language selected successfully!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			});
			setTimeout(() => navigate("/"), 5000);
		} catch (error) {
			// handle errors as needed
			console.error("Error updating course:", error);
			toast.error("Error updating course. Please try again.");
		}
	};

	const selectCourse = (course: Course) => {
		dispatch(setCourse(course));
		navigate("/lessons");
		// Ensure user is not null before updating
		if (user) {
			const updatedUser = {
				...user,
				course: course,
				learning_language: course.language,
				native_language_code: course.native_language_code,
			};
			dispatch(updateAuthUser({ user: updatedUser }));
			updateLanguageInBackend(updatedUser);
		} else {
			console.error("User is null, cannot update course");
		}
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

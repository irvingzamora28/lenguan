import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Course } from "../../types/course";
import { setCourse } from "../../redux/courseSlice";
import { getCourses } from "../../utils/courses";
import { useCourses, useUser } from "../../redux/hooks";
import { User } from "../../types";
import { ToastContainer, toast } from "react-toastify";
import { useApi } from "../../hooks/api/useApi";
import { updateAuthUser } from "../../redux/authSlice";
import { useAuthProtectionService } from "../../hooks/useAuthProtectionService";

const SelectCoursePage: React.FC = () => {
	const dispatch = useDispatch();
	const user = useUser();
	const navigate = useNavigate();
	const courses = useCourses();
	const { postRequest } = useApi();
	const { updateCourse } = useAuthProtectionService();

	// Fetch the courses available to select
	getCourses(courses, dispatch);

	const selectCourse = async (course: Course) => {
		dispatch(setCourse(course));
		// Ensure user is not null before updating
		if (user) {
			const updatedUser = {
				...user,
				course: course,
				learning_language: course.language,
				native_language_code: course.native_language_code,
			};
			dispatch(updateAuthUser({ user: updatedUser }));
			try {
				await updateCourse(course._id, postRequest);

				// Display success notification
				toast.success("Course selected successfully!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});

				// Redirect after a short delay to allow the user to see the notification
				setTimeout(() => navigate("/lessons"), 3000);
			} catch (error) {
				// Handle errors
				toast.error("Error updating course. Please try again.");
			}
		} else {
			console.error("User is null, cannot update course");
		}
	};

	return (
		<Layout>
			<ToastContainer />
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

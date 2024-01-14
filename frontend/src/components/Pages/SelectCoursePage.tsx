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
	const { updateCourse, updateLanguage } = useAuthProtectionService();

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
				await updateLanguage(course.language._id, postRequest);

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
			<h2 className="text-3xl font-bold mb-8 text-gray-800">Select a Course</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses &&
					Array.isArray(courses) &&
					courses.map((course, index) => (
						<div key={course._id} onClick={() => selectCourse(course)} className="course-box transform transition duration-500 hover:scale-105 cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden">
							<div className="flex justify-between p-4">
								<h3 className="text-xl font-semibold mb-2">{course.name}</h3>
								<div className="flex items-center">
									<img src={`src/assets/images/flags/${course.native_language_code}.png`} alt={course.native_language_code} className="w-6 h-6 mr-2" />
									<span className="text-sm font-medium">{getLanguageFullName(course.native_language_code)}</span>
								</div>
							</div>
							<img src={course.image} alt={course.name} className="w-full h-64 object-cover object-center" />
							<div className="p-4">
								<p className="text-gray-600">{course.description}</p>
							</div>
						</div>
					))}
			</div>
		</Layout>
	);
};

function getLanguageFullName(languageCode: string): string {
	const languageMap: { [key: string]: string } = {
		en: "English",
		es: "Español",
	};

	return languageMap[languageCode] || "Unknown";
}

export default SelectCoursePage;

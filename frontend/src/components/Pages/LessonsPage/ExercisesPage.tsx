import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { FaRegNewspaper, FaDisease, FaMicrophoneAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";
import { MdArrowBack } from "react-icons/md";

const ExercisesPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);

	const exercisesCategories = [
		{ title: "Vocabulary Exercises", icon: <FaRegNewspaper /> },
		{ title: "Grammar Exercises", icon: <FiBookOpen /> },
		{ title: "Pronunciation Exercises", icon: <HiOutlineSpeakerphone /> },
		{ title: "Translation Exercises", icon: <FaDisease /> },
		{ title: "Listening Exercises", icon: <FaMicrophoneAlt /> },
		{ title: "Writing Exercises", icon: <IoMdCreate /> },
		{ title: "Fill-in-the-blank Exercises", icon: <BiAbacus /> },
	];

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 items-center">
					<h2 className="text-2xl font-bold sm:col-start-1 sm:col-end-3 text-center sm:text-left">Exercises for Lesson {lesson_number}</h2>
					<Link
						to={`/lessons/${lesson_number}`}
						className="flex items-center w-fit justify-self-center sm:justify-self-end border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
					>
						<MdArrowBack className="mr-2" /> Back to lesson
					</Link>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:col-span-3">
						{exercisesCategories.map((exerciseCategory, index) => (
							<div key={index} className="bg-backgroundalt shadow-md rounded-lg p-4 text-center">
								<div className="flex justify-center text-3xl">{exerciseCategory.icon}</div>
								<h3 className="text-xl font-bold">{exerciseCategory.title}</h3>
							</div>
						))}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default ExercisesPage;

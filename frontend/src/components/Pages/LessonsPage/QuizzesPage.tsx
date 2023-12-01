import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FaQuestionCircle, FaSortAlphaDown } from "react-icons/fa";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";
import { MdArrowBack } from "react-icons/md";

const QuizzesPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);

	const quizzesCategories = [
		{ title: "Multiple Choice Quiz", icon: <FaQuestionCircle />, link: `/lessons/${lesson_number}/quizzes/multiple-choice` },
		{ title: "Sentence Formation Quiz", icon: <FaSortAlphaDown />, link: `/lessons/${lesson_number}/quizzes` },
	];

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">Quizzes for Lesson {lesson_number}</h2>
						<Link to={`/lessons/${lesson_number}`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
							<MdArrowBack className="mr-2" /> Back to lesson
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{quizzesCategories.map((quizCategory, index) => (
							<Link key={index} to={quizCategory.link} className="no-underline">
								<div key={index} className="bg-backgroundalt shadow-md rounded-lg p-4 text-center">
									<div className="flex justify-center text-3xl">{quizCategory.icon}</div>
									<h3 className="text-xl font-bold">{quizCategory.title}</h3>
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</Layout>
	);
};

export default QuizzesPage;

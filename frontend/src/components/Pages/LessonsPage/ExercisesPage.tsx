import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { FaRegNewspaper, FaDisease, FaMicrophoneAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";
import { MdArrowBack } from "react-icons/md";

import { GRAMMAR_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH, LISTENING_EXERCISE_PATH, VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH, WRITING_EXERCISE_CREATE_STORYPATH } from "../../../constants/routes";
import ModalSimple from "../../Utilities/ModalSimple";

interface ExerciseCategory {
	title: string;
	icon: React.ReactNode;
	exercises: { title: string; route: string; icon: string }[];
}

const ExercisesPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);

	const exercisesCategories = [
		{
			title: "Vocabulary Exercises",
			icon: <FaRegNewspaper />,
			exercises: [{ title: "Scrambled Words", route: VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH, icon: "🔠" }],
		},
		{
			title: "Grammar Exercises",
			icon: <FiBookOpen />,
			exercises: [{ title: "Verb Conjugation Slot Machine", route: GRAMMAR_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH, icon: "🎰" }],
		},
		{ title: "Pronunciation Exercises", icon: <HiOutlineSpeakerphone />, exercises: [] },
		{ title: "Translation Exercises", icon: <FaDisease />, exercises: [] },
		{
			title: "Listening Exercises",
			icon: <FaMicrophoneAlt />,
			exercises: [{ title: "Listening Exercise", route: LISTENING_EXERCISE_PATH, icon: "👂" }],
		},
		{ title: "Writing Exercises", icon: <IoMdCreate />, exercises: [{ title: "Create a Story", route: WRITING_EXERCISE_CREATE_STORYPATH, icon: "✍️" }] },
		{ title: "Fill-in-the-blank Exercises", icon: <BiAbacus />, exercises: [] },
	];

	const [clickedCategory, setClickedCategory] = useState<ExerciseCategory | null>(null);

	const handleExerciseCategoryClick = (category: ExerciseCategory) => {
		setClickedCategory(category);
		setShowModal(true);
	};

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 items-center">
					<h2 className="text-2xl font-bold sm:col-start-1 sm:col-end-3 text-center sm:text-left">Exercises for Lesson {lesson_number}</h2>
					<Link
						to={`/lessons/${lesson_number}`}
						className="flex items-center w-fit justify-self-center sm:justify-self-end border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
					>
						<MdArrowBack className="mr-2" /> Back to lesson
					</Link>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:col-span-3">
						{exercisesCategories.map((exerciseCategory, index) => (
							<div key={index} onClick={() => handleExerciseCategoryClick(exerciseCategory)} className="exercise-category cursor-pointer bg-backgroundalt shadow-md rounded-lg p-4 text-center">
								<div className="flex justify-center text-3xl">{exerciseCategory.icon}</div>
								<h3 className="text-xl font-bold">{exerciseCategory.title}</h3>
							</div>
						))}
					</div>
					<ModalSimple
						show={showModal}
						onClose={() => setShowModal(false)}
						title="Select Exercise"
						icon={ <span className="text-2xl"> <FaCheckCircle /> </span> }
						color="bg-primary-500"
						onClickOutside={() => setShowModal(false)}
					>
						<div className="flex flex-wrap justify-center text-xl md:text-3xl">
							{clickedCategory?.exercises.map((exercise, index) => (
								<Link key={index} to={exercise.route.replace(":lesson_number", lesson_number ?? "")} className="p-2">
									<button className="w-full md:w-auto h-32 md:h-40 bg-primary-200 text-primary-800 font-bold py-2 px-4 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 flex items-center justify-center border-2 border-primary-300 relative overflow-hidden">
										<span className="mr-2 text-lg md:text-2xl">{exercise.icon}</span>
										{exercise.title}
										<div className="absolute inset-0 bg-gradient-to-b from-primary-100 to-primary-600 opacity-0 hover:opacity-30  transition-opacity duration-300 ease-in-out"></div>
									</button>
								</Link>
							))}
						</div>
					</ModalSimple>
				</div>
			)}
		</Layout>
	);
};

export default ExercisesPage;

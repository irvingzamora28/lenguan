import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { FaRegNewspaper, FaDisease, FaMicrophoneAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import Layout from "../../Layout/Layout";
import { MdArrowBack } from "react-icons/md";

import {
	VERB_CONJUGATION_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH,
	LISTENING_EXERCISE_PATH,
	VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH,
	WRITING_EXERCISE_CREATE_STORYPATH,
	GRAMMAR_EXERCISE_SENTENCE_CORRECTION_PATH,
} from "../../../constants/routes";
import { useFetchExercises } from "../../../hooks/fetch/useFetchExercises";
import { useUser } from "../../../redux/hooks";
import { ErrorBanner } from "../../Utilities/ErrorBanner";

interface ExerciseCategory {
	title: string;
	type: string;
	icon: React.ReactNode;
	exercises: { title: string; route: string; icon: string }[];
}

const ExercisesPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(false);
	const user = useUser();
	const [exercises, exercisesError] = useFetchExercises(user?.course?._id ?? "", lesson_number ?? "");
	console.log("exercises", exercises);

	const exercisesCategories: ExerciseCategory[] = [
		{
			type: "VocabularyExercise",
			title: "Vocabulary Exercises",
			icon: <FaRegNewspaper />,
			exercises: [{ title: "Scrambled Words", route: VOCABULARY_EXERCISE_SCRAMBLED_WORDS_PATH, icon: "🔠" }],
		},
		{
			type: "GrammarExercise",
			title: "Grammar Exercises",
			icon: <FiBookOpen />,
			exercises: [{ title: "Sentence Correction", route: GRAMMAR_EXERCISE_SENTENCE_CORRECTION_PATH, icon: "🔎" }],
		},
		{
			type: "VerbConjugationExercise",
			title: "Verb Conjugation Exercises",
			icon: <FiBookOpen />,
			exercises: [{ title: "Verb Conjugation Slot Machine", route: VERB_CONJUGATION_EXERCISE_VERB_CONJUGATION_SLOT_MACHINE_PATH, icon: "🎰" }],
		},
		{ title: "Pronunciation Exercises", type: "PronunciationExercise", icon: <HiOutlineSpeakerphone />, exercises: [] },
		{ title: "Translation Exercises", type: "TranslationExercise", icon: <FaDisease />, exercises: [] },
		{
			type: "ListeningExercise",
			title: "Listening Exercises",
			icon: <FaMicrophoneAlt />,
			exercises: [{ title: "Listening Exercise", route: LISTENING_EXERCISE_PATH, icon: "👂" }],
		},
		{ title: "Writing Exercises", type: "WritingExercise", icon: <IoMdCreate />, exercises: [{ title: "Create a Story", route: WRITING_EXERCISE_CREATE_STORYPATH, icon: "✍️" }] },
		{ title: "Fill-in-the-blank Exercises", type: "FillInTheBlankExercise", icon: <BiAbacus />, exercises: [] },
	];

	return (
		<Layout>
			<div className="container mx-auto px-4 py-16 ">
				{/* Display errors if they exist */}
				{exercisesError && <ErrorBanner message={exercisesError} />}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 items-center">
					<h2 className="text-2xl sm:text-2xl font-bold text-gray-800 sm:col-start-1 sm:col-end-3 text-center sm:text-left">
						Exercises for Lesson {lesson_number} :
						<p className="text-lg text-secondary-500 hover:text-secondary-700 transition duration-300 ease-in-out" style={{ marginTop: "0.5rem" }}>
							{exercises?.lesson.name}
						</p>
					</h2>

					<Link
						to={`/lessons/${lesson_number}`}
						className="flex items-center w-fit justify-self-center sm:justify-self-end border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow sm:col-start-3 sm:col-end-4 order-last sm:order-none"
					>
						<MdArrowBack className="mr-2" /> Back to lesson
					</Link>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:col-span-3 lg:my-16">
						{exercisesCategories
							.filter((exerciseCategory) => exercises?.exercise_types.includes(exerciseCategory.type) && exerciseCategory.exercises.length > 0)
							.map((exerciseCategory, categoryIndex) => {
								// Filter the exercises that match the current category type
								const relevantExercises = exercises?.exercises.filter((e) => e.type === exerciseCategory.type);

								return (
									<div key={categoryIndex} className="exercise-category mb-8">
										<h3 className="flex text-2xl space-x-4 items-center font-bold text-slate-800">
											<span>{exerciseCategory.icon}</span>
											<span>{exerciseCategory.title}</span>
										</h3>
										<div className="mt-4 grid gap-4 grid-cols-2">
											{exerciseCategory.exercises.map((exercise, exerciseIndex) => (
												<Link key={exerciseIndex} to={exercise.route.replace(":lesson_number", lesson_number ?? "")} state={{ exerciseDetails: relevantExercises }} className="exercise-link">
													<div className="exercise-card bg-slate-200 hover:bg-slate-300 transition-colors duration-300 ease-in-out rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
														<div className="text-3xl mb-2">{exercise.icon}</div>
														<span className="text-md font-semibold text-slate-700">{exercise.title}</span>
													</div>
												</Link>
											))}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ExercisesPage;

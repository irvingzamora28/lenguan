import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Modal from "../../Utilities/Modal";
import Layout from "../../Layout/Layout";

const SentenceFormationQuiz: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [userResponses, setUserResponses] = useState<string[]>([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const quizzes = [
		{
			words: ["trinken", "Wasser", "Möchtest", "du"],
			correctSentence: "Möchtest du Wasser trinken?",
		},
		{
			words: ["ist", "Kaffee", "Der", "heiß"],
			correctSentence: "Der Kaffee ist heiß.",
		},
		{
			words: ["Ich", "Kuchen", "mag", "den"],
			correctSentence: "Ich mag den Kuchen.",
		},
	];

	const handleChange = (index: number, sentence: string) => {
		const newResponses = [...userResponses];
		newResponses[index] = sentence;
		setUserResponses(newResponses);
	};

	const isCorrectAnswer = (index: number) => userResponses[index] === quizzes[index].correctSentence;

	useEffect(() => {
		if (isSubmitted) {
			const allAnswersCorrect = userResponses.every((response, index) => isCorrectAnswer(index));
			if (allAnswersCorrect) {
				setShowModal(true);
			}
		}
	}, [isSubmitted, userResponses]);

	const handleSubmit = () => {
		if (userResponses.length === quizzes.length) {
			setIsSubmitted(true);
			const allAnswersCorrect = userResponses.every((response, index) => isCorrectAnswer(index));
			if (allAnswersCorrect) {
				setShowModal(true);
			}
		} else {
			alert("Please answer all questions before submitting.");
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSubmit();
		}
	};

	return (
		<Layout>
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">Sentence formation quiz for Lesson {lesson_number}</h2>
					<Link to={`/lessons/${lesson_number}/quizzes`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
						<MdArrowBack className="mr-2" /> Back to quizzes
					</Link>
				</div>

				<div className="p-4 bg-backgroundalt shadow-md rounded-lg">
					{quizzes.map((quiz, index) => (
						<div key={index} className="mb-4">
							<h3 className="text-xl font-bold mb-2">Form a sentence using these words:</h3>
							<p className="mb-2">{quiz.words.join(", ")}</p>
							<input
								type="text"
								value={userResponses[index] || ""}
								onChange={(event) => handleChange(index, event.target.value)}
								onKeyDown={handleKeyDown}
								className="p-3 rounded-lg w-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:shadow-outline"
								placeholder="Type your sentence here"
							/>
							{isSubmitted && (
								<div className={`mt-2 text-sm font-semibold ${isCorrectAnswer(index) ? "text-green-600" : "text-red-600"}`}>{isCorrectAnswer(index) ? "Correct!" : `Incorrect. Correct sentence: ${quiz.correctSentence}`}</div>
							)}
						</div>
					))}

					<button onClick={handleSubmit} disabled={userResponses.length !== quizzes.length} className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
						Submit Answers
					</button>
					<Modal show={showModal} onClose={() => setShowModal(false)} title="Congratulations" icon={<span className="text-6xl">🎉</span>} color="bg-green-500">
						<p className="text-xl font-bold text-green-600">You formed all sentences correctly!</p>
					</Modal>
				</div>
			</div>
		</Layout>
	);
};

export default SentenceFormationQuiz;

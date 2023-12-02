import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import Modal from "../../Utilities/Modal";

type Question = {
	question: string;
	options: string[];
	correctAnswer: string;
};

const MultipleChoiceQuiz: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const questions: Question[] = [
		{
			question: "What is the English translation of 'Brot'?",
			options: ["Cheese", "Bread", "Cake", "Apple"],
			correctAnswer: "Bread",
		},
		{
			question: "What does 'Kaffee' mean in English?",
			options: ["Water", "Coffee", "Beer", "Soup"],
			correctAnswer: "Coffee",
		},
		{
			question: "The word 'Apfel' translates to:",
			options: ["Apple", "Soup", "Bread", "Cake"],
			correctAnswer: "Apple",
		},
		{
			question: "Choose the English translation for 'Kuchen':",
			options: ["Cheese", "Cake", "Water", "Coffee"],
			correctAnswer: "Cake",
		},
		{
			question: "What is the English equivalent of 'Wasser'?",
			options: ["Beer", "Coffee", "Water", "Juice"],
			correctAnswer: "Water",
		},
		{
			question: "Translate 'Käse' into English:",
			options: ["Bread", "Cheese", "Soup", "Cake"],
			correctAnswer: "Cheese",
		},
		{
			question: "Which of the following is the translation for 'Suppe'?",
			options: ["Juice", "Soup", "Bread", "Beer"],
			correctAnswer: "Soup",
		},
	];

	const handleOptionClick = (questionIndex: number, option: string) => {
		const newAnswers = [...selectedAnswers];
		newAnswers[questionIndex] = option;
		setSelectedAnswers(newAnswers);
	};

	const isCorrectAnswer = (questionIndex: number) => selectedAnswers[questionIndex] === questions[questionIndex].correctAnswer;

	useEffect(() => {
		if (isSubmitted) {
			const allAnswersCorrect = selectedAnswers.every((answer, index) => isCorrectAnswer(index));
			if (allAnswersCorrect) {
				setShowModal(true);
			}
		}
	}, [isSubmitted, selectedAnswers]);

	const handleSubmit = () => {
		if (selectedAnswers.length === questions.length) {
			setIsSubmitted(true);
			const allAnswersCorrect = selectedAnswers.every((answer, index) => isCorrectAnswer(index));
			if (allAnswersCorrect) {
				setShowModal(true);
			}
		} else {
			alert("Please answer all questions before submitting.");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Multiple choice quiz for Lesson {lesson_number}</h2>
				<Link to={`/lessons/${lesson_number}/quizzes`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
					<MdArrowBack className="mr-2" /> Back to quizzes
				</Link>
			</div>

			<div className="p-4 bg-backgroundalt shadow-md rounded-lg">
				{questions.map((question, index) => (
					<div key={index} className="mb-4">
						<h3 className="text-xl font-bold mb-2">{question.question}</h3>
						<div className="grid grid-cols-1 gap-2">
							{question.options.map((option, optionIndex) => (
								<button key={optionIndex} className={`p-2 rounded-lg text-left ${selectedAnswers[index] === option ? "bg-blue-200" : "bg-gray-200"}`} onClick={() => handleOptionClick(index, option)}>
									{option}
								</button>
							))}
						</div>
						{isSubmitted && (
							<div className={`mt-2 text-sm font-semibold ${isCorrectAnswer(index) ? "text-green-600" : "text-red-600"}`}>{isCorrectAnswer(index) ? "Correct!" : `Incorrect. Answer: ${question.correctAnswer}`}</div>
						)}
					</div>
				))}

				<button onClick={handleSubmit} disabled={selectedAnswers.length !== questions.length} className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
					Submit Answers
				</button>
				<Modal show={showModal} onClose={() => setShowModal(false)} title="Congratulations" icon={<span className="text-6xl">🎉</span>} color="bg-green-500">
					<p className="text-xl font-bold text-green-600">You answered all questions correctly!</p>
				</Modal>
			</div>
		</div>
	);
};

export default MultipleChoiceQuiz;

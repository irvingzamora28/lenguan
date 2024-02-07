import React, { useState, useEffect } from "react";

interface FeedbackModalProps {
	closeModal: () => void;
}

interface Question {
	label: string;
	name: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ closeModal }) => {
	const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
	const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

	useEffect(() => {
		const questions: Question[] = [
			{ label: "Usability of our platform: (optional)", name: "usability" },
			{ label: "Features to add or improve: (optional)", name: "feature_request" },
			{ label: "How effective do you find the learning materials and exercises? (optional)", name: "learning_materials" },
			{ label: "Do you have any suggestions for new languages or content? (optional)", name: "new_languages" },
			{ label: "How satisfied are you with the pace and structure of the courses? (optional)", name: "course_pace" },
		];

		// Select two random questions
		const shuffled = questions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffled.slice(0, 2));
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle the feedback submission logic here
		setFeedbackSubmitted(true);
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
				{!feedbackSubmitted ? (
					<form onSubmit={handleSubmit}>
						<div className="text-lg font-semibold text-gray-900">Your Feedback</div>

						{/* Random questions */}
						{selectedQuestions.map((question, index) => (
							<div key={index} className="mt-4">
								<label htmlFor={question.name} className="text-sm font-semibold text-gray-700">
									{question.label}
								</label>
								<input type="text" id={question.name} name={question.name} className="w-full mt-1 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
							</div>
						))}

						<div className="mt-4">
							<label htmlFor="generalFeedback" className="text-sm font-semibold text-gray-700">
								Other thoughts or suggestions:
							</label>
							<textarea
								id="generalFeedback"
								name="generalFeedback"
								className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
								rows={3}
								placeholder="Please share your thoughts"
								required
							></textarea>
						</div>

						<button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
							Submit Feedback
						</button>
					</form>
				) : (
					<div className="text-center">
						<div className="text-lg font-semibold text-gray-900">Thank you for your feedback!</div>
						<p className="mt-4 text-sm text-gray-700">Your input is invaluable to us. We're constantly working to improve your experience.</p>
						<button onClick={closeModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
							Close
						</button>
					</div>
				)}

				<button onClick={closeModal} className="absolute top-2 text-3xl right-2 text-gray-400 hover:text-gray-600 transition duration-300">
					&times;
				</button>
			</div>
		</div>
	);
};

export default FeedbackModal;

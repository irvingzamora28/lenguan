import React, { useState, useEffect } from "react";
import useFormHandler from "../../../hooks/useFormHandler";
import { FeedbackFormData, FormErrors, FormValues } from "../../../types/form";
import { FormSubmitService } from "../../../services/FormSubmitService";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

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

	const validateFeedbackForm = (values: FormValues): FormErrors => {
		let errors: FormErrors = {};

		if (!values.general_feedback) {
			errors.general_feedback = "Feedback is required";
		}
		return errors;
	};

	const formInitialValues = {
		general_feedback: "",
	};

	const { values, handleChange, handleSubmit, errors, reset, isSubmitting } = useFormHandler({
		initialValues: formInitialValues,
		validate: validateFeedbackForm,
	});

	const submitFeedbackForm = async (formData: FormValues) => {
		try {
			const submitData: FeedbackFormData = {
				usability: formData.usability,
				feature_request: formData.feature_request,
				learning_materials: formData.learning_materials,
				new_languages: formData.new_languages,
				course_pace: formData.course_pace,
				general_feedback: formData.general_feedback,
			};
			const response = await FormSubmitService.submitFeedbackForm(submitData);
			if (response?.data.success) {
				toast.success("Thank you for your feedback!", { position: "top-right", autoClose: 5000 });
				reset();
				closeModal();
			}
		} catch (error) {
			toast.error("There was an error submitting your feedback. Please try again later.", { position: "top-right", autoClose: 5000 });
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="fixed inset-0 bg-gray-600 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center">
				<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
					{!feedbackSubmitted ? (
						<form onSubmit={handleSubmit(submitFeedbackForm)}>
							<div className="text-lg font-semibold text-gray-900">Your Feedback</div>

							{/* Random questions */}
							{selectedQuestions.map((question, index) => (
								<div key={index} className="mt-4">
									<label htmlFor={question.name} className="text-sm font-semibold text-gray-700">
										{question.label}
									</label>
									<input
										type="text"
										id={question.name}
										name={question.name}
										onChange={handleChange}
										className="w-full mt-1 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
									/>
								</div>
							))}

							<div className="mt-4">
								<label htmlFor="general_feedback" className="text-sm font-semibold text-gray-700">
									Other thoughts or suggestions:
								</label>
								<textarea
									id="general_feedback"
									value={values.general_feedback}
									onChange={handleChange}
									name="general_feedback"
									className="w-full p-3 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
									rows={3}
									placeholder="Please share your thoughts"
									required
								></textarea>
							</div>

							{errors.feedback && <span className="text-red-500 text-xs">{errors.feedback}</span>}
							{/* Submit Button */}
							<button type="submit" disabled={isSubmitting} className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center w-full transition duration-300 ease-in-out">
								{isSubmitting ? (
									<>
										<LoadingSpinner />
										<span className="ml-2">Submitting...</span>
									</>
								) : (
									"Submit Feedback"
								)}
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
		</>
	);
};

export default FeedbackModal;

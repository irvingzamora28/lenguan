import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdOutlineTipsAndUpdates } from "react-icons/md";

const TipsTricksPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);

	// Tips and Tricks data
	const tipsData = [
		{
			title: "Practice with Mnemonics",
			description: "Create memorable associations for new words. For instance, link 'Brot' (bread) with an image of a boat.",
		},
		{
			title: "Repetition is Key",
			description: "Regularly practice new vocabulary. Daily repetition, even for a few minutes, aids memory retention.",
		},
		{
			title: "Real-life Application",
			description: "Label items in your kitchen in German or think of the German words while grocery shopping.",
		},
		{
			title: "Audio Reinforcement",
			description: "Listen to the pronunciation of new words and repeat them. This helps with accurate pronunciation and memory.",
		},
		{
			title: "Flashcards with Example Sentences",
			description: "Use flashcards that include German words, their translations, and example sentences for context.",
		},
		// Add more tips as needed
	];

	useEffect(() => {
		// Fetch data or perform other setup tasks
	}, [lesson_number]);

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">Tips & Tricks for Lesson {lesson_number}</h2>
						<Link to={`/lessons/${lesson_number}`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
							<MdArrowBack className="mr-2" /> Back to lesson
						</Link>
					</div>
					<div className="flex justify-center text-3xl mb-6">
						<MdOutlineTipsAndUpdates />
					</div>
					<div className="bg-backgroundalt shadow-md rounded-lg p-4">
						{tipsData.map((tip, index) => (
							<div key={index} className="mb-4">
								<h3 className="text-xl font-bold">{tip.title}</h3>
								<p>{tip.description}</p>
							</div>
						))}
					</div>
				</>
			)}
		</Layout>
	);
};

export default TipsTricksPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parseFrontmatter } from "../../../utils/parseFrontmatter";
import { parseContent } from "../../../utils/parseContent";
import { MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbBarbell, TbVocabulary } from "react-icons/tb";
import Layout from "../../Layout/Layout";
import Lesson from "../../Items/Lesson/Lesson";
import TextToSpeechPlayer from "../../Items/Lesson/TextToSpeechPlayer";

const IndividualLessonPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [lessonContent, setLessonContent] = useState("");
	const [vocabulary, setVocabulary] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFileContent = async () => {
			try {
				const lessonModule = await import(`../../../lessons/german/lesson${id}.mdx`);
				const response = await fetch(lessonModule.default);
				if (response.ok) {
					const text = await response.text();
					// Extract metadata from the MDX content
					const metadata = parseFrontmatter(text);

					// Extract the content without the frontmatter
					const content = parseContent(text);

					setLessonContent(content);
					setVocabulary(metadata?.vocabulary || []);
					setError(null);
				} else {
					setError(`There was an error getting the lesson content. Please try again later`);
				}
			} catch (error) {
				const errMsg = (error as Error).message;
				setError(`There was an error getting the lesson content. Please try again later`);
			}
		};

		fetchFileContent();
	}, [id]);

	const activities = [
		{ title: "Exercises", icon: <TbBarbell /> },
		{ title: "Quizzes", icon: <MdOutlineQuiz /> },
		{ title: "Vocabulary", icon: <TbVocabulary /> },
		{ title: "Tips & Tricks", icon: <MdOutlineTipsAndUpdates /> },
	];

	return (
		<Layout>
			<h2 className="text-2xl font-bold mb-6">Lesson {id}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<div className="grid md:grid-flow-col grid-cols-2 md:grid-cols-4 col-span-4 lg:col-span-3 bg-white gap-4 mb-8">
					{activities.map((activity, index) => (
						<div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
							<div className="flex justify-center text-3xl">{activity.icon}</div>
							<h3 className="text-xl font-bold">{activity.title}</h3>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="md:col-span-3 bg-white shadow-md rounded-lg p-4">
					<TextToSpeechPlayer text="Hallo, wie geht es dir?" />
					{error ? (
						<>
							<h3 className="text-xl font-bold mb-4">Lesson Content</h3>
							<div className="error-message">
								<p>{error}</p>
							</div>
						</>
					) : (
						<Lesson content={lessonContent} />
					)}
				</div>
				<div className="bg-white shadow-md rounded-lg p-4">
					<h3 className="text-xl font-bold mb-4">Vocabulary</h3>
					<ul>
						{vocabulary?.map((word, index) => (
							<li key={index}>{word}</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default IndividualLessonPage;

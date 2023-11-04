import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parseFrontmatter } from "../../../utils/parseFrontmatter";
import { parseContent } from "../../../utils/parseContent";
import { MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbBarbell, TbVocabulary } from "react-icons/tb";
import Layout from "../../Layout/Layout";
import Lesson from "../../Items/Lesson/Lesson";
import NotFoundPage from "../NotFoundPage";
import FlashCardVocabulary from "../../Items/Lesson/FlashCardVocabulary";

const LessonPage: React.FC = () => {
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
		{ title: "Exercises", icon: <TbBarbell />, link: `/lessons/${id}/exercises` },
		{ title: "Quizzes", icon: <MdOutlineQuiz />, link: `/lessons/${id}/quizzes` },
		{ title: "Vocabulary", icon: <TbVocabulary />, link: `/lessons/${id}/vocabulary` },
		{ title: "Tips & Tricks", icon: <MdOutlineTipsAndUpdates />, link: `/lessons/${id}/tips-and-tricks` },
	];

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<h2 className="text-2xl font-bold mb-6">Lesson {id}</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						<div className="grid md:grid-flow-col grid-cols-2 md:grid-cols-4 col-span-4 lg:col-span-3 gap-4 mb-8">
							{activities.map((activity, index) => (
								// Wrap the container with a Link component
								<Link key={index} to={activity.link} className="no-underline">
									<div className="bg-backgroundalt shadow-md rounded-lg p-4 text-center cursor-pointer">
										<div className="flex justify-center text-3xl">{activity.icon}</div>
										<h3 className="text-xl font-bold">{activity.title}</h3>
									</div>
								</Link>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="md:col-span-3 bg-backgroundalt shadow-md rounded-lg p-4">
							<Lesson content={lessonContent} />
						</div>
						<div className="bg-backgroundalt shadow-md rounded-lg p-4">
							<h3 className="text-xl font-bold mb-4">Vocabulary</h3>
							<ul className="flex flex-wrap justify-center gap-4">
								<FlashCardVocabulary word="Hallo" translation="Hello" exampleSentence="Hallo, wie geht's?" exampleTranslation="Hello, how are you?" />
							</ul>
						</div>
					</div>
				</>
			)}
		</Layout>
	);
};

export default LessonPage;

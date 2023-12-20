import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { parseFrontmatter } from "../../../utils/parseFrontmatter";
import { parseContent } from "../../../utils/parseContent";
import { MdArrowBack, MdArrowForward, MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbBarbell, TbVocabulary } from "react-icons/tb";
import Layout from "../../Layout/Layout";
import Lesson from "../../Items/Lesson/Lesson";
import FlashCardVocabulary from "../../Items/Lesson/FlashCardVocabulary";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { useUser } from "../../../redux/hooks";

type Gender = "fem" | "masc" | "neut";

type VocabularyItem = {
	word: string;
	translation: string;
	exampleSentence: string;
	exampleTranslation: string;
	gender?: Gender;
};

const LessonPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const currentLessonNumber = parseInt(lesson_number ? lesson_number : "0");
	const [lessonContent, setLessonContent] = useState("");
	const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [prevLessonExists, setPrevLessonExists] = useState(false);
	const [nextLessonExists, setNextLessonExists] = useState(false);
	const user = useUser();
	useScrollToTop();

	// Function to check if a lesson exists
	const checkLessonExistence = async (lessonNum: number) => {
		try {
			await import(`../../../lessons/${user?.language?.name.toLowerCase()}/lesson${lessonNum}.mdx`);
			return true;
		} catch (error) {
			return false;
		}
	};

	// Function to check existence of adjacent lessons
	const checkAdjacentLessons = async (currentLessonNumber: number) => {
		const prevLesson = currentLessonNumber - 1;
		const nextLesson = currentLessonNumber + 1;

		const [prevExists, nextExists] = await Promise.all([checkLessonExistence(prevLesson), checkLessonExistence(nextLesson)]);

		return { prevExists, nextExists };
	};

	useEffect(() => {
		const fetchFileContent = async () => {
			try {
				const lessonModule = await import(`../../../lessons/${user?.language?.name.toLowerCase()}/lesson${lesson_number}.mdx`);
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
					// Check for adjacent lessons
					const { prevExists, nextExists } = await checkAdjacentLessons(currentLessonNumber);
					setPrevLessonExists(prevExists);
					setNextLessonExists(nextExists);
				} else {
					setError(`There was an error getting the lesson content. Please try again later`);
				}
			} catch (error) {
				const errMsg = (error as Error).message;
				setError(`There was an error getting the lesson content. Please try again later`);
			}
		};

		fetchFileContent();
	}, [lesson_number]);

	const activities = [
		{ title: "Exercises", icon: <TbBarbell />, link: `/lessons/${lesson_number}/exercises` },
		{ title: "Quizzes", icon: <MdOutlineQuiz />, link: `/lessons/${lesson_number}/quizzes` },
		{ title: "Vocabulary", icon: <TbVocabulary />, link: `/lessons/${lesson_number}/vocabulary` },
		{ title: "Tips & Tricks", icon: <MdOutlineTipsAndUpdates />, link: `/lessons/${lesson_number}/tips-and-tricks` },
	];

	return (
		<Layout>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Lesson {lesson_number}</h2>
				<Link to="/lessons" className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
					<MdArrowBack className="mr-2" /> All Lessons
				</Link>
			</div>
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
						{vocabulary.map((item, index) => (
							<FlashCardVocabulary key={index} word={item.word} translation={item.translation} exampleSentence={item.exampleSentence} exampleTranslation={item.exampleTranslation} gender={item.gender} />
						))}
					</ul>
				</div>
			</div>

			<div className="flex justify-between items-center my-6">
				{prevLessonExists && (
					<Link to={`/lessons/${currentLessonNumber - 1}`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded-lg shadow">
						<MdArrowBack className="mr-2" /> Previous Lesson
					</Link>
				)}
				{nextLessonExists && (
					<Link to={`/lessons/${currentLessonNumber + 1}`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded-lg shadow">
						Next Lesson <MdArrowForward className="ml-2" />
					</Link>
				)}
			</div>
		</Layout>
	);
};

export default LessonPage;

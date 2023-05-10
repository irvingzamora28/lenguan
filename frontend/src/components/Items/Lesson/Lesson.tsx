import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { parseFrontmatter } from "../../../utils/parseFrontmatter";
import { parseContent } from "../../../utils/parseContent";

interface LessonProps {
	language: string;
	lessonNumber: number;
}

const Lesson: React.FC<LessonProps> = ({ language, lessonNumber }) => {
	const [lessonData, setLessonData] = useState({ content: "" });
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFileContent = async () => {
			try {
				const lessonModule = await import(`../../../lessons/${language}/lesson${lessonNumber}.mdx`);
				const response = await fetch(lessonModule.default);
				if (response.ok) {
					const text = await response.text();
					// Extract metadata from the MDX content
					const metadata = parseFrontmatter(text);

					// Do something with the metadata
					console.log("Metadata:", metadata);

					// Extract the content without the frontmatter
					const content = parseContent(text);
					console.log(content);

					setLessonData({ content });

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
	}, [language, lessonNumber]);

	return (
		<div>
			{error ? (
				<div className="error-message">
					<p>{error}</p>
				</div>
			) : (
				<Markdown
					options={{
						overrides: {
							h1: {
								props: {
									className: "py-3 text-2xl md:text-3xl lg:text-4xl",
								},
							},
							h2: {
								props: {
									className: "py-3 text-xl md:text-2xl lg:text-3xl",
								},
							},
							ul: {
								props: {
									className: "pl-5 py-3 list-disc",
								},
							},
							ol: {
								props: {
									className: "pl-5 py-3 list-decimal",
								},
							},
							p: {
								props: {
									className: "py-3",
								},
							},
							blockquote: {
								props: {
									className: "text-md italic font-normal text-gray-500 dark:text-white",
								},
							},
						},
					}}
				>
					{lessonData.content}
				</Markdown>
			)}
		</div>
	);
};

export default Lesson;

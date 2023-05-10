import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { AiFillBell } from "react-icons/ai";
import { MdOutlineQuiz, MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbBarbell, TbVocabulary } from "react-icons/tb";
import Markdown from 'markdown-to-jsx';
import Lesson from "../../Items/Lesson/Lesson";

interface LayoutProps {
	children: React.ReactNode;
}

// surprise, it's a div instead!
const MyParagraph: React.FC<LayoutProps> = ({ children, ...props }) => (
    <div {...props}>{children}</div>
);

const IndividualLessonPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const activities = [
		{ title: "Exercises", icon: <TbBarbell /> },
		{ title: "Quizzes", icon: <MdOutlineQuiz /> },
		{ title: "Vocabulary", icon: <TbVocabulary /> },
		{ title: "Tips & Tricks", icon: <MdOutlineTipsAndUpdates /> },
	];

	return (
		<Layout>
            <AiFillBell />
			<h2 className="text-2xl font-bold mb-6">Lesson {id}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<div className="grid md:grid-flow-col grid-cols-2 md:grid-cols-4 col-span-4 lg:col-span-3 bg-white gap-4 mb-8">
					{activities.map((activity, index) => (
						<div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
                            <div className="flex justify-center text-3xl">
							{activity.icon}
                            </div>
							<h3 className="text-xl font-bold">{activity.title}</h3>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="md:col-span-3 bg-white shadow-md rounded-lg p-4">
					<h3 className="text-xl font-bold mb-4">Lesson Content</h3>
                    <Lesson language="german" lessonNumber={1} />
				</div>
				<div className="bg-white shadow-md rounded-lg p-4">
					<h3 className="text-xl font-bold mb-4">Vocabulary</h3>
					<ul>
						<li>Word 1</li>
						<li>Word 2</li>
						<li>Word 3</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default IndividualLessonPage;

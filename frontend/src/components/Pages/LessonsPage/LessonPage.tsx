import React from "react";
import { useParams } from "react-router-dom";

const IndividualLessonPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const activities = [
		{ title: "Exercises", icon: "your-icon-source" },
		{ title: "Quizzes", icon: "your-icon-source" },
		{ title: "Vocabulary", icon: "your-icon-source" },
		{ title: "Tips & Tricks", icon: "your-icon-source" },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold mb-6">Lesson {id}</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<div className="grid md:grid-flow-col grid-cols-2 md:grid-cols-4 col-span-4 lg:col-span-3 bg-white gap-4 mb-8">
					{activities.map((activity, index) => (
						<div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
							<img src={activity.icon} alt={activity.title} className="mx-auto mb-4 w-16 h-16" />
							<h3 className="text-xl font-bold">{activity.title}</h3>
						</div>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="md:col-span-3 bg-white shadow-md rounded-lg p-4">
					<h3 className="text-xl font-bold mb-4">Lesson Content</h3>
					<p>Here goes the lesson content...</p>
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
		</div>
	);
};

export default IndividualLessonPage;

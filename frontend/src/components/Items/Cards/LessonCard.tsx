import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../../../types/lesson";
import { EXERCISE_TYPES } from "../../../constants/exercises";

interface LessonCardProps extends Lesson {}

const LessonCard: React.FC<LessonCardProps> = ({ _id, image, name, lesson_number, description, progress, goals, exercise_types }) => {
	useEffect(() => {
		console.log(exercise_types);
		console.log(EXERCISE_TYPES);
	}, []);

	return (
		<div className="flex flex-col h-full rounded-lg shadow-xl bg-white">
			<img src={image} alt={name} className="w-full h-40 rounded-t-lg object-cover" />
			<div className="flex flex-col justify-between flex-grow p-4">
				<div>
					<Link to={`/lessons/${lesson_number}`} className="text-decoration-none">
						<h3 className="text-xl font-bold mb-2 text-title">{name}</h3>
					</Link>
					<p className="text-subtitle mb-4">{description}</p>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full h-2 bg-gray-200 rounded mb-4">
						<div className="h-2 bg-primary-500 rounded" style={{ width: `${progress}%` }}></div>
					</div>
					<div className="flex flex-row w-full mb-4">
						{exercise_types.map(
							(type) =>
								EXERCISE_TYPES[type] && (
									// In EXERCISE_TYPES[type].default_url, replace ":lesson_number" by the actual lesson_number
									<Link to={EXERCISE_TYPES[type].default_url.replace(":lesson_number", `${lesson_number}`)}>
										<span className="w-6 h-6 mr-2">{EXERCISE_TYPES[type].icon}</span>
									</Link>
								)
						)}
					</div>

					<ul className="flex flex-wrap">
						{goals.map((goal, index) => (
							<li key={index} className="text-sm bg-secondary-100 text-subtitle px-2 py-1 rounded mr-1 mb-1">
								{goal.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default LessonCard;

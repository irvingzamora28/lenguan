import React from "react";
import LessonCard from "../../Items/Cards/LessonCard";
import Filter from "../../Items/Forms/Filter";
import Layout from "../../Layout/Layout";
import { useSelectedCourse, useSelectedLanguage, useUser } from "../../../redux/hooks";
import { Goal } from "../../../types/goal";
import { useFilteredLessons } from "../../../hooks/filter/useFilteredLessons";
import { useFetchLessons } from "../../../hooks/fetch/useFetchLessons";
import { useFetchGoals } from "../../../hooks/fetch/useFetchGoals";
import { ErrorBanner } from "../../Utilities/ErrorBanner";

const LessonsPage: React.FC = () => {
	// TODO: Remove useSelectedLanguage and useSelectedCourse, they are not needed anymore
	const selectedLanguage = useSelectedLanguage();
	const selectedCourse = useSelectedCourse();
	const user = useUser();

	const [lessons, lessonsError] = useFetchLessons(user?.course?._id);
	const [goals, goalsError] = useFetchGoals(user?.learning_language?._id);

	const [filteredLessons, setSearchTerm, setSelectedFilter, searchTerm] = useFilteredLessons(lessons, "", "All");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (filterValue: string) => {
		setSelectedFilter(filterValue);
	};

	return (
		<Layout>
			<div className="grid grid-cols-1 gap-4">
				{/* Display errors if they exist */}
				{lessonsError && <ErrorBanner message={lessonsError} />}
				{goalsError && <ErrorBanner message={goalsError} />}

				<div className="flex flex-col md:flex-row justify-between">
					<div className="p-4 self-end w-full md:w-1/2 lg:w-1/3">
						<Filter onFilterChange={handleFilterChange} filterOptions={goals} />
					</div>
					<div className="p-4 self-end w-full md:w-1/2 lg:w-1/3">
						{/* TODO: Implement dark text */}
						<label htmlFor="countries" className="block mb-2 text-sm font-medium text-title dark:text-gray-400">
							Search:
						</label>
						<input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search lessons..." className="border w-full border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 mt-4">
				<div className="p-4">
					<h2 className="text-2xl font-bold mb-4 text-title">Lessons</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{filteredLessons.map((lesson) => (
							<LessonCard
								key={lesson._id}
								_id={lesson._id}
								lesson_number={lesson.lesson_number}
								image={"https://picsum.photos/300/200"}
								name={lesson.name}
								description={lesson.description}
								progress={lesson.progress}
								goals={lesson.goals.map((goal: Goal): Goal => goal)}
								exercise_types={lesson.exercise_types}
							/>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LessonsPage;

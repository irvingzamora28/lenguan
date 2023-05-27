import React, { useEffect, useState } from "react";
import LessonCard from "../../Items/Cards/LessonCard";
import Filter from "../../Items/Forms/Filter";
import Layout from "../../Layout/Layout";
import api from "../../../utils/api";

interface Lesson {
	_id: string;
	image: string;
	name: string;
	description: string;
	progress: number;
    goals: Goal[];
}

interface Goal {
	_id: string;
	name: string;
}

const LessonsPage: React.FC = () => {
	const [lessons, setLessons] = useState<Lesson[]>([]);
	const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("All");
    const [goals, setGoals] = useState<string[]>([])

	useEffect(() => {
		let filtered = lessons;

		if (searchTerm) {
			filtered = filtered.filter((lesson) => lesson.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		if (selectedFilter !== "All") {
			filtered = filtered.filter((lesson) => lesson.goals.map((goal: Goal): string => goal.name).includes(selectedFilter));
		}

		setFilteredLessons(filtered);
	}, [searchTerm, selectedFilter, lessons]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (filterValue: string) => {
		setSelectedFilter(filterValue);
	};

	const fetchGoals = async () => {
		const response = await api.get("/api/goals/645380bc118d5d794c0084fd");
		console.log(response.data);
        setGoals(response.data.map((goal: Goal): string => goal.name))
	};

	const fetchLessons = async () => {
		const response = await api.get("/api/courses/645380bc118d5d794c0084ff/lessons");
		console.log(response.data);
		console.log(response.data);

		setLessons(response.data);
	};

	useEffect(() => {
		fetchLessons();
		fetchGoals();
	}, []);

	return (
		<Layout>
			<div className="grid grid-cols-1 gap-4">
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
							<LessonCard key={lesson._id} _id={lesson._id} image={"https://picsum.photos/300/200"} name={lesson.name} description={lesson.description} progress={lesson.progress} goals={lesson.goals.map((goal: Goal): string => goal.name)} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LessonsPage;

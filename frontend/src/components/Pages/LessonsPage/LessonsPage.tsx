import React, { useEffect, useState } from "react";
import SidebarMenu from "../../Items/Menu/SidebarMenu";
import Navbar from "../../Items/Navbar/Navbar";
import LessonCard from "../../Items/Cards/LessonCard";
import Filter from "../../Items/Forms/Filter";

// Mock data for lessons
const mockLessons = [
	{
		_id: "1",
		image: "https://picsum.photos/300/200",
		title: "Introduction to Programming",
		description: "Learn the basics of programming, including variables, data types, loops, and functions.",
		progress: 25,
		tags: ["Beginner", "Programming"],
	},
	{
		_id: "2",
		image: "https://picsum.photos/300/200",
		title: "Web Development Basics",
		description: "Get started with web development by learning HTML, CSS, and JavaScript fundamentals.",
		progress: 60,
		tags: ["Beginner", "Web Development"],
	},
	{
		_id: "3",
		image: "https://picsum.photos/300/200",
		title: "Advanced JavaScript",
		description: "Dive deeper into JavaScript with advanced concepts like closures, prototypes, and async/await.",
		progress: 80,
		tags: ["Advanced", "JavaScript"],
	},
	{
		_id: "4",
		image: "https://picsum.photos/300/200",
		title: "React and Redux",
		description: "Learn how to build modern web applications using React for the UI and Redux for state management.",
		progress: 50,
		tags: ["Intermediate", "React", "Redux"],
	},
];

interface Lesson {
	_id: string;
	image: string;
	title: string;
	description: string;
	progress: number;
	tags: string[];
}

const LessonsPage: React.FC = () => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [asideOpen, setAsideOpen] = useState(true);
	const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
	const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(mockLessons);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("All");

	useEffect(() => {
		let filtered = lessons;

		if (searchTerm) {
			filtered = filtered.filter((lesson) => lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		if (selectedFilter !== "All") {
			filtered = filtered.filter((lesson) => lesson.tags.includes(selectedFilter));
		}

		setFilteredLessons(filtered);
	}, [searchTerm, selectedFilter, lessons]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (filterValue: string) => {
		setSelectedFilter(filterValue);
	};

	return (
		<main className="min-h-screen w-full bg-gray-100 text-gray-700">
			<Navbar asideOpen={asideOpen} setAsideOpen={setAsideOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
			<div className="flex">
				{asideOpen && <SidebarMenu />}
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-4">
						<div className="flex flex-col md:flex-row justify-between">
							<div className="p-4 self-end w-full md:w-1/2 lg:w-1/3">
								<Filter onFilterChange={handleFilterChange} />
							</div>
							<div className="p-4 self-end w-full md:w-1/2 lg:w-1/3">
								<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
									Search:
								</label>
								<input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search lessons..." className="border w-full border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 mt-4">
						<div className="p-4">
							<h2 className="text-2xl font-bold mb-4">Lessons</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{filteredLessons.map((lesson) => (
									<LessonCard key={lesson._id} _id={lesson._id} image={lesson.image} title={lesson.title} description={lesson.description} progress={lesson.progress} tags={lesson.tags} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default LessonsPage;

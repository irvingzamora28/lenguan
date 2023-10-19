import { useState, useEffect } from "react";
import { Lesson } from "../../types/lesson";

export const useFilteredLessons = (initialLessons: Lesson[], initialSearchTerm: string, initialFilter: string): [Lesson[], (newTerm: string) => void, (newFilter: string) => void, string] => {
	const [originalLessons, setOriginalLessons] = useState<Lesson[]>(initialLessons);
	const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(initialLessons);
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const [selectedFilter, setSelectedFilter] = useState(initialFilter);
	console.log("initialLessons", initialLessons);

	useEffect(() => {
		setOriginalLessons(initialLessons);
	}, [initialLessons]);

	useEffect(() => {
		const filtered = filterLessons(originalLessons, searchTerm, selectedFilter);
		setFilteredLessons(filtered);
	}, [searchTerm, selectedFilter, originalLessons]);

	console.log("filteredLessons", filteredLessons);

	return [filteredLessons, setSearchTerm, setSelectedFilter, searchTerm];
};

const filterLessons = (lessons: Lesson[], term: string, filter: string): Lesson[] => {
	let filtered = [...lessons];
	if (term) {
		filtered = filtered.filter((lesson) => lesson.name.toLowerCase().includes(term.toLowerCase()));
	}
	if (filter !== "All") {
		filtered = filtered.filter((lesson) => lesson.goals.some((goal) => goal.name === filter));
	}
	return filtered;
};

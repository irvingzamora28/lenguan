import React, { useState } from "react";

interface FilterProps {
	onFilterChange: (filterValue: string) => void;
	filterOptions: string[];
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, filterOptions }) => {
	const [selectedFilter, setSelectedFilter] = useState("All");

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const filterValue = e.target.value;
		setSelectedFilter(filterValue);
		onFilterChange(filterValue);
	};

	return (
		<div>
			<label htmlFor="countries" className="block mb-2 text-sm font-medium text-title dark:text-gray-400">
				Filter:
			</label>
			<select
				id="filter"
				name="filter"
                value={selectedFilter}
				onChange={handleFilterChange}
				className="bg-gray-50 border border-gray-300 text-title text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
			>
				<option value={"All"}>All</option>
				{filterOptions.map((option, index) =>
					<option key={index} value={option}>{option}</option>
				)}
			</select>
		</div>
	);
};

export default Filter;

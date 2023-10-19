import { useState, useEffect } from "react";
import { GoalService } from "../../services/GoalService";

export const useFetchGoals = (languageId?: string): [string[], string | null] => {
	const [goals, setGoals] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedGoals = await GoalService.fetchGoals(languageId);
				if (!fetchedGoals.length) {
					setError("Error fetching goals. Please try again later.");
				} else {
					setGoals(fetchedGoals.map((goal) => goal.name));
				}
			} catch (err) {
				console.error("Error fetching goals:", err);
				setError("Error fetching goals. Please try again later.");
			}
		};
		fetchData();
	}, [languageId]);

	return [goals, error];
};

import React from "react";
import { Player } from "../../../../types";

interface GenderDuelScoreBoardProps {
	players: Partial<{ [id: string]: Player }>;
}

const GenderDuelScoreBoard: React.FC<GenderDuelScoreBoardProps> = ({ players }) => {
	return (
		<div className="mt-8 bg-yellow-200 p-4 rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-yellow-800 mb-4">🏆 Scoreboard 🏆</h2>
			<div className="space-y-3">
				{players &&
					Object.entries(players).map(([id, player]) =>
						player ? (
							<div
								key={id}
								className="flex items-center justify-between p-2 bg-white rounded-lg shadow-inner transform hover:scale-105 transition-transform duration-300"
							>
								<span className="text-lg font-bold text-blue-700">
									{player.username}
								</span>
								<span className="text-lg font-extrabold text-green-600">
									{player.score}
								</span>
							</div>
						) : null
					)}
			</div>
		</div>
	);
};

export default GenderDuelScoreBoard;

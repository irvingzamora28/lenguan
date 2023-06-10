import React from "react";
import { Player } from "../../../../types";

interface GenderDuelScoreBoardProps {
	players: Partial<{[id: string]: Player}>;
}

const GenderDuelScoreBoard: React.FC<GenderDuelScoreBoardProps> = ({ players }) => {
	return (
		<div className="mt-8 text-maintextalt">
			<h2 className="">Score</h2>
			{players && Object.entries(players).map(([id, player]) => (
				player ?
				<p key={id} className="font-semibold">
					{player.name}: {player.score}
				</p>
				: null
			))}
		</div>
	);
};

export default GenderDuelScoreBoard;

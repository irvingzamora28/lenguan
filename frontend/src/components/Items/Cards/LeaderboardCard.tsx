import React from "react";

const leaderboardData = [
	{
		id: 1,
		rank: 1,
		username: "John Smith",
		points: 975,
		imageUrl: "https://picsum.photos/70",
	},
	{
		id: 2,
		rank: 2,
		username: "Jane Doe",
		points: 850,
		imageUrl: "https://picsum.photos/70",
	},
	{
		id: 3,
		rank: 3,
		username: "Michael Brown",
		points: 800,
		imageUrl: "https://picsum.photos/70",
	},
	{
		id: 4,
		rank: 4,
		username: "Sarah Johnson",
		points: 750,
		imageUrl: "https://picsum.photos/70",
	},
	{
		id: 5,
		rank: 5,
		username: "David Lee",
		points: 700,
		imageUrl: "https://picsum.photos/70",
	},
];

const LeaderboardCard: React.FC = () => (
	<>
		{/* Leaderboard Card */}
		<div className="col-span-1 md:col-span-2 h-fit bg-backgroundalt p-6 rounded-xl drop-shadow-xl">
			<h3 className="text-2xl font-bold mb-4">Leaderboard</h3>
			{leaderboardData.map((user, index) => (
				<div key={user.id} className="flex items-center gap-4 mb-4">
					<span className="text-xl font-bold w-8 flex justify-center items-center">{index === 0 ? <>🥇</> : index === 1 ? <>🥈</> : index === 2 ? <>🥉</> : user.rank}</span>
					<img src={user.imageUrl} className="w-12 h-12 object-cover rounded-full" alt={`${user.username}'s profile picture`} />
					<div className="flex flex-col">
						<h4 className="text-xl font-bold">{user.username}</h4>
						<span className="text-subtitle">{user.points} points</span>
					</div>
				</div>
			))}
		</div>
	</>
);

export default LeaderboardCard;

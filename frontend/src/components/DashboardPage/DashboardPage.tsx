import React, { useState } from "react";
import { RiLineChartLine } from "react-icons/ri";
import { AiOutlineLike, AiOutlineMessage, AiOutlineShareAlt } from "react-icons/ai";
import SidebarMenu from "./Menu/SidebarMenu";
import Navbar from "./Navbar/Navbar";
import SocialFeedCard from "./Cards/SocialFeedCard";
import LeaderboardCard from "./Cards/LeaderboardCard";
import FriendsCard from "./Cards/FriendsCard";

const DashboardPage: React.FC = () => {
	const [profileOpen, setProfileOpen] = useState(false);
	const [asideOpen, setAsideOpen] = useState(true);

	return (
		<main className="min-h-screen w-full bg-gray-100 text-gray-700">
			<Navbar asideOpen={asideOpen} setAsideOpen={setAsideOpen} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
			<div className="flex">
				{asideOpen && <SidebarMenu />}
				<div className="w-full p-4">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam odit officiis magni doloribus ipsa dolore, dolores nihil accusantium labore, incidunt autem iure quae vitae voluptate, esse asperiores aliquam
					repellat. Harum aliquid non officiis porro at cumque eaque inventore iure. Modi sunt optio mollitia repellat sed ab quibusdam quos harum!
					<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
						{/* Card 1 */}
						<div className="bg-blue-500 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
							<RiLineChartLine className="text-5xl" />
							<h4 className="text-2xl">Earnings</h4>
							<span className="text-5xl text-white">&euro; 8,350</span>
							<span className="py-1 px-3 bg-blue-500/80 rounded-full">+ 10% since last month</span>
						</div>
						{/* Card 2 */}
						<div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl">
							<div className="flex items-center gap-4 bg-blue-500/10 rounded-xl p-4">
								<span className="bg-blue-500 text-gray-300 text-2xl font-bold p-4 rounded-xl">98</span>
								<div>
									<h3 className="font-bold">Rank</h3>
									<p className="text-gray-500">In top 30%</p>
								</div>
							</div>
							<div className="bg-blue-500/10 rounded-xl p-4">
								<div className="flex items-center gap-4 mb-4">
									<span className="bg-blue-500 text-gray-300 text-2xl font-bold p-4 rounded-xl">32</span>
									<div>
										<h3 className="font-bold">Projects</h3>
										<p className="text-gray-500">8 this month</p>
									</div>
								</div>
								<div className="flex items-center gap-2 text-gray-500 text-sm">
									<span className="bg-blue-500/20 py-1 px-4 rounded-full">Mobile app</span>
									<span className="bg-blue-500/20 py-1 px-4 rounded-full">Branding</span>
								</div>
							</div>
						</div>
                        <FriendsCard />
					</section>
					<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
						<SocialFeedCard />
						<LeaderboardCard />
					</section>
				</div>
			</div>
		</main>
	);
};

export default DashboardPage;

import React, { useState } from "react";
import SidebarMenu from "../../Items/Menu/SidebarMenu";
import Navbar from "../../Items/Navbar/Navbar";
import SocialFeedCard from "../../Items/Cards/SocialFeedCard";
import LeaderboardCard from "../../Items/Cards/LeaderboardCard";
import FriendsCard from "../../Items/Cards/FriendsCard";
import ChartsCard from "../../Items/Cards/ChartsCard";

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
                        <ChartsCard />
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

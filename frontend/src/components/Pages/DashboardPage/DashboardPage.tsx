import React from "react";
import SocialFeedCard from "../../Items/Cards/SocialFeedCard";
import LeaderboardCard from "../../Items/Cards/LeaderboardCard";
import FriendsCard from "../../Items/Cards/FriendsCard";
import ChartsCard from "../../Items/Cards/ChartsCard";
import Layout from "../../Layout/Layout";

const DashboardPage: React.FC = () => {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-16 ">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita quam odit officiis magni doloribus ipsa dolore, dolores nihil accusantium labore, incidunt autem iure quae vitae voluptate, esse asperiores aliquam repellat.
				Harum aliquid non officiis porro at cumque eaque inventore iure. Modi sunt optio mollitia repellat sed ab quibusdam quos harum!
				<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
					<ChartsCard />
					<FriendsCard />
				</section>
				<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
					<SocialFeedCard />
					<LeaderboardCard />
				</section>
			</div>
		</Layout>
	);
};

export default DashboardPage;

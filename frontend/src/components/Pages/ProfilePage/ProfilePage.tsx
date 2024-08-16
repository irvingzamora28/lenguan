import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../redux/hooks";
import Layout from "../../Layout/Layout";
import useUserProfileImageUrl from "../../../hooks/user/useUserProfileImageUrl";
import { LANGUAGE_MAPPING } from "../../../constants/languages";

const ProfilePage: React.FC = () => {
	const user = useUser();
	const profileImageUrl = useUserProfileImageUrl(user?.profile_image_path);
	const getUserLanguage = (code: string) => LANGUAGE_MAPPING[code] || "Unknown";

	return (
		<Layout>
			<div className="container mx-auto px-4 py-16 ">
				<div className="p-4 md:p-8 max-w-screen-md mx-auto">
					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="text-center p-4 md:p-6">
							<div className="relative inline-block">
								<img src={profileImageUrl} alt={`${user?.name}'s Profile`} className="rounded-full h-32 w-32 object-cover mx-auto" />
							</div>
							<h2 className="text-3xl font-bold my-2 md:my-6">Profile Details</h2>
						</div>
						<div className="px-4 md:px-6">
							<div className="mb-4">
								<strong className="block text-lg">Name:</strong>
								<p>{user?.name}</p>
							</div>
							<div className="mb-4">
								<strong className="block text-lg">Email:</strong>
								<p>{user?.email}</p>
							</div>
							<div className="mb-4">
								<strong className="block text-lg">My language:</strong>
								<p>{getUserLanguage(user?.native_language_code ?? "")}</p>
							</div>
						</div>
						<div className="bg-gray-100 p-4 md:p-6 text-center">
							<Link to="/edit-profile" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ease-in-out">
								Edit Profile
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ProfilePage;

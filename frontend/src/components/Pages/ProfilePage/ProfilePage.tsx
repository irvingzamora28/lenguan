import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to edit page
import { useUser } from "../../../redux/hooks";
import { useApi } from "../../../hooks/api/useApi";

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const user = useUser();
	console.log(user);

    const { getRequest } = useApi();

	useEffect(() => {
		fetchUserData();
	}, []);

	const fetchUserData = async () => {
		try {
			const response = await getRequest("/api/user");
			// handle response
            console.log(response.data);

		} catch (error) {
			// handle error
		}
	};

	const handleEditClick = () => {
		navigate("/edit-profile"); // Replace with your actual route to edit profile
	};

	return (
		<div className="p-4 md:p-8 max-w-screen-md mx-auto">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="p-4 md:p-6">
					<h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
					<div className="mb-4">
						<strong>Name:</strong> {user?.name}
					</div>
					<div className="mb-4">
						<strong>Email:</strong> {user?.email}
					</div>
					{/* Add more user details here */}
				</div>
				<div className="bg-gray-50 p-4 md:p-6">
					<button onClick={handleEditClick} className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded">
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to edit page
import { User } from "../../../types";
import { useUser } from "../../../redux/hooks";

const ProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const user = useUser();
	console.log(user);

	// This is a placeholder for user data loading logic
	useEffect(() => {
		// Load user data here if needed
	}, []);

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

// EditProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../redux/hooks"; // Assuming you have a hook to fetch user data
import { useApi } from "../../../hooks/api/useApi";
import Layout from "../../Layout/Layout";

const EditProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const { putRequest } = useApi();
	const user = useUser();
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				username: user.username || "",
				email: user.email || "",
			});
		}
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await putRequest("/api/user", formData);
			console.log(response);
			// Redirect or show success message
			navigate("/profile");
		} catch (error) {
			console.error("Error updating profile:", error);
			// Handle error (e.g., show error message)
		}
	};

	return (
		<Layout>
			<div className="p-4 md:p-8 max-w-screen-md mx-auto">
				<div className="bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="p-4 md:p-6">
						<h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									value={formData.name}
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									value={formData.username}
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formData.email}
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
							</div>
							<div className="flex justify-end">
								<button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded">
									Save Changes
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default EditProfilePage;

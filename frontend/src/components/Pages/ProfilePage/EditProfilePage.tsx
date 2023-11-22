import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../redux/hooks";
import { useApi } from "../../../hooks/api/useApi";
import Layout from "../../Layout/Layout";
import InputField from "../../Items/Forms/InputField";

const EditProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const { putRequest } = useApi();
	const user = useUser();
	const [formData, setFormData] = useState({ name: "", username: "", email: "" });
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) {
			setFormData({ name: user.name || "", username: user.username || "", email: user.email || "" });
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
			navigate("/profile");
		} catch (error) {
			setError("Error updating profile. Please try again.");
		}
	};

	return (
		<Layout>
			<div className="p-4 md:p-8 max-w-screen-md mx-auto">
				<div className="bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="p-4 md:p-6">
						<h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
						<form onSubmit={handleSubmit}>
							{error && <div className="mb-4 text-red-600">{error}</div>}
							<InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
							<InputField label="Username" name="username" value={formData.username} onChange={handleInputChange} />
							<InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />

							{/* Save button */}
							<div className="flex justify-end mt-6">
								<button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
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

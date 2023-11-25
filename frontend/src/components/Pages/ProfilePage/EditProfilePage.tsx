import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../redux/hooks";
import { useApi } from "../../../hooks/api/useApi";
import Layout from "../../Layout/Layout";
import InputField from "../../Items/Forms/InputField";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateAuthUser } from "../../../redux/authSlice";
import { User } from "../../../types";
import useUserProfileImageUrl from "../../../hooks/user/useUserProfileImageUrl";

interface ValidationErrors {
	name?: string;
	username?: string;
	email?: string;
}

const EditProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { postRequest } = useApi();
	const user = useUser();
	const [formData, setFormData] = useState({ name: "", username: "", email: "" });
	const [error, setError] = useState("");
	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const profileImageUrl = useUserProfileImageUrl(user?.profile_image_path);
    const profilePreviewUrl = profilePicturePreview || profileImageUrl;

	useEffect(() => {
		if (user) {
			setFormData({ name: user.name || "", username: user.username || "", email: user.email || "" });
		}
	}, [user]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setProfilePicture(file);
			setProfilePicturePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formDataToSend = new FormData();
		formDataToSend.append("name", formData.name);
		formDataToSend.append("username", formData.username);
		formDataToSend.append("email", formData.email);
		formDataToSend.append("_method", "PUT");
		if (profilePicture) {
			console.log("append profilePicture", profilePicture);

			formDataToSend.append("image", profilePicture);
		}

		try {
			const response = await postRequest("/api/user", formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const updatedUser: User = response.data.user;
			dispatch(updateAuthUser({ user: updatedUser }));
			navigate("/profile");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.data.errors) {
					setValidationErrors(error.response.data.errors);
				} else {
					setError("Error updating profile. Please try again.");
				}
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	useEffect(() => {
		// Cleanup function to revoke the data URL
		return () => {
			if (profilePicturePreview) {
				URL.revokeObjectURL(profilePicturePreview);
			}
		};
	}, [profilePicturePreview]);

	return (
		<Layout>
			<div className="p-4 md:p-8 max-w-screen-md mx-auto">
				<div className="bg-white shadow-lg rounded-lg overflow-hidden">
					<div className="p-4 md:p-6">
						<h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
						<form onSubmit={handleSubmit}>
							{error && <div className="mb-4 text-red-600">{error}</div>}

							{/* Image upload and preview */}
							<div className="relative inline-block mb-4">
								<input type="file" name="profilePicture" id="profilePictureInput" className="hidden" onChange={handleImageChange} />
								<img src={profilePreviewUrl} alt="Profile Preview" className="rounded-full h-32 w-32 object-cover" />
								<label htmlFor="profilePictureInput" className="absolute bottom-0 right-0 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-2 cursor-pointer">
									<FaCamera />
								</label>
							</div>
							<InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} error={validationErrors.name} />
							<InputField label="Username" name="username" value={formData.username} onChange={handleInputChange} error={validationErrors.username} />
							<InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={validationErrors.email} />

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

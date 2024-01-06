import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/languageSlice";
import Layout from "../Layout/Layout";
import { FaLanguage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "./../../assets/scss/components/SelectLanguagePage.scss";
import "react-toastify/dist/ReactToastify.css";
import { useLanguages, useUser } from "../../redux/hooks";
import { getLanguages } from "../../utils/languages";
import { Language } from "../../types/language";
import { updateAuthUser } from "../../redux/authSlice";
import { useApi } from "../../hooks/api/useApi";
import { useAuthProtectionService } from "../../hooks/useAuthProtectionService";

// TODO: Remove all references of old selectedLanguage state
const SelectLanguagePage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const user = useUser();
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
	const languages = useLanguages();
	const { updateLanguage } = useAuthProtectionService();

	const { postRequest } = useApi();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Fetch the languages available to select
	getLanguages(languages, dispatch);

	const selectLanguage = async (language: Language) => {
		setSelectedLanguage(language.code);
		dispatch(setLanguage(language));
		if (user) {
			const updatedUser = { ...user, learning_language: language };
			dispatch(updateAuthUser({ user: updatedUser }));
			try {
				await updateLanguage(language._id, postRequest);

				// Display success notification
				toast.success("Language selected successfully!", {
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				});

				// Redirect after a short delay to allow the user to see the notification
				setTimeout(() => navigate("/"), 3000);
			} catch (error) {
				// Handle errors
				toast.error("Error updating language. Please try again.");
			}
		} else {
			console.error("User is null, cannot update language");
		}
	};

	return (
		<Layout>
			<ToastContainer />
			<h2 className="text-2xl font-bold mb-6">Select a language</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{languages &&
					Array.isArray(languages) &&
					languages.map((language, index) => (
						<div
							key={index}
							className={`language-box bg-backgroundalt shadow-md rounded-lg p-4 text-center cursor-pointer transition-colors duration-500 ease-in-out delay-300 hover:bg-primary-200 ${
								selectedLanguage === language.code ? "bg-highlight" : ""
							}`}
							onClick={() => selectLanguage(language)}
						>
							<div className="flex justify-center text-3xl">
								<FaLanguage />
							</div>
							<h3 className="text-xl font-bold">{language.name}</h3>
						</div>
					))}
			</div>
		</Layout>
	);
};

export default SelectLanguagePage;

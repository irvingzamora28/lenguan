import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/languageSlice";
import Layout from "../Layout/Layout";
import NotFoundPage from "./NotFoundPage";

const languages = [
	{ title: "English", code: "en" },
	{ title: "German", code: "de" },
	{ title: "French", code: "fr" },
	// Add more languages as needed
];

const SelectLanguagePage: React.FC = () => {
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const selectLanguage = (languageCode: string) => {
        dispatch(setLanguage(languageCode));
		navigate("/"); // Redirect to home page
	};

	return (
		<Layout>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<h2 className="text-2xl font-bold mb-6">Select a language</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{languages.map((language, index) => (
							<div key={index} className="bg-backgroundalt shadow-md rounded-lg p-4 text-center cursor-pointer" onClick={() => selectLanguage(language.code)}>
								<div className="flex justify-center text-3xl"></div>
								<h3 className="text-xl font-bold">{language.title}</h3>
							</div>
						))}
					</div>
				</>
			)}
		</Layout>
	);
};

export default SelectLanguagePage;

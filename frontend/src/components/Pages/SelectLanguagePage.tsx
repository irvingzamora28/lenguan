import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/languageSlice";
import Layout from "../Layout/Layout";
import NotFoundPage from "./NotFoundPage";
import { FaLanguage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "./../../assets/scss/components/SelectLanguagePage.scss";
import 'react-toastify/dist/ReactToastify.css';

const languages = [
    { title: "English", code: "en" },
    { title: "German", code: "de" },
    { title: "French", code: "fr" },
    { title: "Spanish", code: "es" },
    // Add more languages as needed
];

const SelectLanguagePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectLanguage = (languageCode: string) => {
        setSelectedLanguage(languageCode);
        dispatch(setLanguage(languageCode));
        toast.success("Language selected successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
        });
        setTimeout(() => navigate("/"), 5000);
    };

    return (
        <Layout>
            {error ? (
                <NotFoundPage />
            ) : (
                <>
        			<ToastContainer />
                    <h2 className="text-2xl font-bold mb-6">Select a language</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {languages.map((language, index) => (
                            <div key={index} className={`language-box bg-backgroundalt shadow-md rounded-lg p-4 text-center cursor-pointer transition-colors duration-500 ease-in-out delay-300 hover:bg-primary-200 ${selectedLanguage === language.code ? "bg-highlight" : ""}`} onClick={() => selectLanguage(language.code)}>
                                <div className="flex justify-center text-3xl">
                                    <FaLanguage />
                                </div>
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

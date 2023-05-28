import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdCreate } from "react-icons/io";
import { FaRegNewspaper, FaDisease, FaMicrophoneAlt } from "react-icons/fa";
import { BiAbacus } from "react-icons/bi";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";

const ExercisesPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);

    const exercisesCategories = [
        { title: "Vocabulary Exercises", icon: <FaRegNewspaper /> },
        { title: "Grammar Exercises", icon: <FiBookOpen /> },
        { title: "Pronunciation Exercises", icon: <HiOutlineSpeakerphone /> },
        { title: "Translation Exercises", icon: <FaDisease /> },
        { title: "Listening Exercises", icon: <FaMicrophoneAlt /> },
        { title: "Writing Exercises", icon: <IoMdCreate /> },
        { title: "Fill-in-the-blank Exercises", icon: <BiAbacus /> },
    ];

    return (
        <Layout>
            {error ? (
                <NotFoundPage />
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-6">Exercises for Lesson {id}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {exercisesCategories.map((exerciseCategory, index) => (
                            <div key={index} className="bg-backgroundalt shadow-md rounded-lg p-4 text-center">
                                <div className="flex justify-center text-3xl">{exerciseCategory.icon}</div>
                                <h3 className="text-xl font-bold">{exerciseCategory.title}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Layout>
    );
};

export default ExercisesPage;

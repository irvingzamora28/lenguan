import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import Layout from "../../Layout/Layout";
import NotFoundPage from "../NotFoundPage";
import FlashCard from "../../Items/Misc/FlashCard";

const VocabularyPage: React.FC = () => {
    const { lesson_number } = useParams<{ lesson_number: string }>();
    const [error, setError] = useState<string | null>(null);

    const flashCardsData = [
        {
            word: 'Strand',
            translation: 'Beach',
            audioUrl: '/path/to/beach-audio.mp3',
            imageUrl: '/src/assets/courses/german/_shared/lessons/lesson7/images/beach.png',
        },
    ];

    useEffect(() => {
        // Fetch data or perform other setup tasks
    }, [lesson_number]);

    return (
        <Layout>
            {error ? (
                <NotFoundPage />
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-6">Vocabulary for Lesson {lesson_number}</h2>
                    <div className="flex justify-center text-3xl mb-6">
                        <FaRegNewspaper />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {flashCardsData.map((card, index) => (
                            <FlashCard key={index} {...card} />
                        ))}
                    </div>
                </>
            )}
        </Layout>
    );
};

export default VocabularyPage;

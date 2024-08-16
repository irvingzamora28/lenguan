import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import FlashCard from "../../Items/Misc/FlashCard";
import { TbVocabulary } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";

const VocabularyPage: React.FC = () => {
	const { lesson_number } = useParams<{ lesson_number: string }>();
	const [error, setError] = useState<string | null>(null);

	const flashCardsData = [
		{
			word: "Das Brot",
			translation: "The Bread",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Das Brot.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/bread.png",
		},
		{
			word: "Das Wasser",
			translation: "The Water",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Das Wasser.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/water.png",
		},
		{
			word: "Der Kaffee",
			translation: "The Coffee",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Der Kaffee.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/coffee.png",
		},
		{
			word: "Der Apfel",
			translation: "The Apple",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Der Apfel.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/apple.png",
		},
		{
			word: "Der Kuchen",
			translation: "The Cake",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Der Kuchen.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/cake.png",
		},
		{
			word: "Das Bier",
			translation: "The Beer",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Das Bier.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/beer.png",
		},
		{
			word: "Der Käse",
			translation: "The Cheese",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Der Käse.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/cheese.png",
		},
		{
			word: "Die Suppe",
			translation: "The Soup",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Die Suppe.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/soup.png",
		},
		{
			word: "Der Wein",
			translation: "The Wine",
			audioUrl: "/src/assets/courses/german/_shared/lessons/lesson7/audio/Der Wine.mp3",
			imageUrl: "/src/assets/courses/german/_shared/lessons/lesson7/images/wine.png",
		},
	];

	useEffect(() => {
		// Fetch data or perform other setup tasks
	}, [lesson_number]);

	return (
		<Layout>
			<div className="container mx-auto px-4 py-16 ">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">Vocabulary for Lesson {lesson_number}</h2>
					<Link to={`/lessons/${lesson_number}`} className="flex items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 my-2 rounded-lg shadow">
						<MdArrowBack className="mr-2" /> Back to lesson
					</Link>
				</div>
				<div className="flex justify-center text-3xl mb-6">
					<TbVocabulary />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{flashCardsData.map((card, index) => (
						<FlashCard key={index} {...card} />
					))}
				</div>
			</div>
		</Layout>
	);
};

export default VocabularyPage;

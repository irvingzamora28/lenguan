import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import correctSound from "../../../assets/audio/correct-choice.mp3";
import incorrectSound from "../../../assets/audio/incorrect-choice.mp3";

interface CardData {
	word: string;
	translation: string;
	emoji: string;
}

interface MemoryCard {
	id: string;
	text: string; // This will be either the word or the translation
	pairId: string; // This will connect the word card with its translation card
	isFlipped: boolean;
}
// Create pairs from the flashcards data
const createCardPairs = (flashcards: CardData[]): MemoryCard[] => {
	const cardPairs: MemoryCard[] = [];

	flashcards.forEach((flashcard, index) => {
		// Create two cards for each flashcard data: one for the word and one for the translation
		const wordCard: MemoryCard = {
			id: `word-${index}`,
			text: flashcard.word,
			pairId: `pair-${index}`,
			isFlipped: false,
		};
		const translationCard: MemoryCard = {
			id: `translation-${index}`,
			text: flashcard.translation,
			pairId: `pair-${index}`,
			isFlipped: false,
		};

		cardPairs.push(wordCard, translationCard);
	});

	return cardPairs;
};

const flashcardsData: CardData[] = [
	{
		word: "House",
		translation: "Das Haus",
		emoji: "🏠",
	},
	{
		word: "Cat",
		translation: "Katze",
		emoji: "🐱",
	},
	{
		word: "Tree",
		translation: "Baum",
		emoji: "🌳",
	},
	{
		word: "Book",
		translation: "Buch",
		emoji: "📖",
	},
	{
		word: "Love",
		translation: "Liebe",
		emoji: "❤️",
	},
	{
		word: "Water",
		translation: "Wasser",
		emoji: "💧",
	},
	{
		word: "Fire",
		translation: "Feuer",
		emoji: "🔥",
	},
	{
		word: "Sun",
		translation: "Sonne",
		emoji: "☀️",
	},
	{
		word: "Moon",
		translation: "Mond",
		emoji: "🌕",
	},
	{
		word: "Star",
		translation: "Stern",
		emoji: "⭐",
	},
	{
		word: "Apple",
		translation: "Apfel",
		emoji: "🍎",
	},
	{
		word: "Mountain",
		translation: "Berg",
		emoji: "⛰️",
	},
	{
		word: "Car",
		translation: "Auto",
		emoji: "🚗",
	},
	{
		word: "Music",
		translation: "Musik",
		emoji: "🎵",
	},
	{
		word: "Light",
		translation: "Licht",
		emoji: "💡",
	},
	{
		word: "Flower",
		translation: "Blume",
		emoji: "🌸",
	},
	{
		word: "Bird",
		translation: "Vogel",
		emoji: "🐦",
	},
	{
		word: "Clock",
		translation: "Uhr",
		emoji: "⏰",
	},
];

const MemoryGame: React.FC = () => {
	const [cards, setCards] = useState<MemoryCard[]>([]);
	const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
	const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
	const [score, setScore] = useState(0);
	const [isChecking, setIsChecking] = useState(false);

	// Initialize the game with shuffled cards
	useEffect(() => {
		// Generate and shuffle card pairs
		const initializedCards = createCardPairs(flashcardsData).sort(() => Math.random() - 0.5); // shuffle cards
		setCards(initializedCards);
	}, []);

	const flipCard = (cardId: string) => {
		if (isChecking) return; // Prevent flipping cards when checking for matches

		// First, flip the card with the given cardId
		const newCards = cards.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card));
		setCards(newCards);

		const selectedCard = newCards.find((card) => card.id === cardId);

		// If we have already flipped one card, we need to check if we have a match
		if (flippedCards.length === 1 && selectedCard) {
			setIsChecking(true);

			const [firstFlippedCard] = flippedCards;
			// Check if the pairId matches, meaning we have found a pair
			if (firstFlippedCard.pairId === selectedCard.pairId) {
				setScore((prevScore) => prevScore + 1); // Increment the score
				setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, selectedCard.pairId]); // Add the pairId to the list of matched pairs
				setFlippedCards([]); // Reset flipped cards
				playSound(correctSound);
				setIsChecking(false);
			} else {
				// If there is no match, flip both cards back over after a short delay
				playSound(incorrectSound);
				setTimeout(() => {
					setCards((prevCards) => prevCards.map((card) => (card.pairId === firstFlippedCard.pairId || card.pairId === selectedCard.pairId ? { ...card, isFlipped: false } : card)));
					setFlippedCards([]); // Reset flipped cards
					setIsChecking(false);
				}, 1000);
			}
		} else {
			// If no card has been flipped yet, or the two flipped cards do not match,
			// set the selected card as the current flipped card
			setFlippedCards([selectedCard].filter((card): card is MemoryCard => card !== undefined));
		}
	};

	const playSound = (sound: string) => {
		const audio = new Audio(sound);
		audio.play();
	};

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="grid-memorygame grid grid-cols-6 gap-4 p-4 rounded-lg w-full max-w-2xl mx-auto">
					{cards.map((card) => (
						<button
							key={card.id}
							className={`flex items-center justify-center rounded-lg shadow-lg p-4 h-24 transition duration-150 ease-in-out transform hover:scale-105 ${
								card.isFlipped || matchedPairs.includes(card.pairId) ? "bg-indigo-100" : "bg-primary-200"
							} ${matchedPairs.includes(card.pairId) ? "cursor-not-allowed opacity-50" : ""}`}
							disabled={card.isFlipped || matchedPairs.includes(card.pairId)}
							onClick={() => flipCard(card.id)}
						>
							{card.isFlipped || matchedPairs.includes(card.pairId) ? (
								<div className="flex flex-col items-center justify-center text-lg font-semibold text-primary-800">
									<span>{card.text}</span>
									<span className="text-2xl">{flashcardsData.find((fc) => fc.word === card.text || fc.translation === card.text)?.emoji}</span>
								</div>
							) : (
								<div className="text-primary-500 text-lg font-semibold">Flip</div>
							)}
						</button>
					))}
				</div>
				<div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md">
					<p className="text-center text-xl text-primary-800">Score: {score}</p>
				</div>
			</div>
		</Layout>
	);
};

export default MemoryGame;

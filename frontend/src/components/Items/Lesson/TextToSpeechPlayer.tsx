import React, { useState, useEffect, useRef } from "react";
import { FiPauseCircle, FiPlayCircle, FiRepeat, FiRewind } from "react-icons/fi";

interface TextToSpeechPlayerProps {
	text: string;
}

const TextToSpeechPlayer: React.FC<TextToSpeechPlayerProps> = ({ text }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [isRepeating, setIsRepeating] = useState(false);
	const [isRestarting, setIsRestarting] = useState(false);

	const utteranceRef = useRef(new SpeechSynthesisUtterance(text));
	utteranceRef.current.lang = "de-DE";

	useEffect(() => {
		utteranceRef.current.text = text;
	}, [text]);

	const handlePlay = () => {
		utteranceRef.current.rate = 0.8;
		utteranceRef.current.pitch = 1;
		window.speechSynthesis.cancel();
		setIsPlaying(true);

		const voices = window.speechSynthesis.getVoices();
		const selectedVoice = voices.find((voice) => voice.lang === "de-DE");
		if (selectedVoice) {
			utteranceRef.current.voice = selectedVoice;
		}
		window.speechSynthesis.speak(utteranceRef.current);
	};

	const handlePause = () => {
		setIsPaused(true);
		window.speechSynthesis.pause();
		setIsPlaying(false);
	};

	const handleResume = () => {
		setIsPaused(false);
		window.speechSynthesis.resume();
		setIsPlaying(true);
	};

	const handlePlayPause = () => {
		if (!isPlaying && !isPaused) handlePlay();
		else if (isPaused) handleResume();
		else handlePause();
	};

	const handleRepeat = () => {
		setIsRepeating(!isRepeating);
	};

	const handleRestart = () => {
		window.speechSynthesis.cancel();
		setIsPlaying(false);
		setIsPaused(false);
		setIsRestarting(true);
	};

	useEffect(() => {
		if ((isRepeating || isRestarting) && !isPlaying && !isPaused) {
			handlePlayPause();
			if (isRestarting) setIsRestarting(false);
		}
	}, [isPlaying, isPaused, isRepeating, isRestarting]);

	useEffect(() => {
		utteranceRef.current.onend = () => {
			setIsPlaying(false);
			setIsPaused(false);
		};
	}, []);

	return (
		<div className="bg-green-200 rounded-lg p-4 flex items-center justify-center space-x-4 shadow-lg hover:shadow-xl">
			<button onClick={handleRestart} className="hover:bg-green-300 hover:text-white rounded-full p-2">
				<FiRewind size={24} />
			</button>
			<button onClick={handlePlayPause} className="hover:bg-green-300 hover:text-white rounded-full p-2">
				{isPlaying ? <FiPauseCircle size={24} /> : <FiPlayCircle size={24} />}
			</button>
			<button onClick={handleRepeat} className="hover:bg-green-300 hover:text-white rounded-full p-2">
				<FiRepeat size={24} className={`text-green-600 ${isRepeating && "text-white bg-green-600 rounded-full"}`} />
			</button>
		</div>
	);
};

export default TextToSpeechPlayer;

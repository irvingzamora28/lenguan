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

	const handlePlayPause = () => {
		console.log(`isPlaying ${isPlaying} | isPaused ${isPaused}`);

		if (!isPlaying && !isPaused) {
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
		} else {
			if (isPaused) {
				console.log(`resume`);

				setIsPaused(!isPaused);
				window.speechSynthesis.resume();
				setIsPlaying(true);
			} else {
				setIsPaused(true);
				console.log(`pause`);
				window.speechSynthesis.pause();
				setIsPlaying(false);
			}
		}
	};

	// Add this useEffect hook to your component
	useEffect(() => {
		console.log(`changed isRepeating ${isRepeating} | isPlaying ${isPlaying} | isPaused ${isPaused}`);

		if (isRepeating && !isPlaying && !isPaused) {
			handlePlayPause();
		}
	}, [isPlaying, isPaused, isRepeating, handlePlayPause]);

    useEffect(() => {
        if (isRestarting && !isPlaying && !isPaused) {
            handlePlayPause();
            setIsRestarting(false);
        }
    }, [isPlaying, isPaused, isRestarting, handlePlayPause]);


	useEffect(() => {
		utteranceRef.current.text = text;
	}, [text]);

	const handleRepeat = () => {
		setIsRepeating((isRepeating) => !isRepeating);
	};

	useEffect(() => {
		utteranceRef.current.onend = () => {
			setIsPlaying(false);
			setIsPaused(false);
			console.log(`onend isRepeating ${isRepeating}`);
			console.log(`onend isPlaying ${isPlaying} | isPaused ${isPaused}`);
		};
		// Dependency array includes isRepeating and handlePlayPause to ensure up-to-date values are used
	}, [isRepeating, handlePlayPause]);

	const handleRestart = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        setIsRestarting(true);
    };


	return (
		<>
			<div className="bg-green-200 rounded-lg p-4 flex items-center justify-center space-x-4">
				<button onClick={handleRestart}>
					<FiRewind size={24} />
				</button>
				<button onClick={handlePlayPause}>{isPlaying ? <FiPauseCircle size={24} /> : <FiPlayCircle size={24} />}</button>
				<button onClick={handleRepeat}>
					<FiRepeat size={24} className={isRepeating ? "text-green-600" : ""} />
				</button>
			</div>
		</>
	);
};
export default TextToSpeechPlayer;

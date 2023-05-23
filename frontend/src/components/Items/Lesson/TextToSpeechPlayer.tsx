import React, { useState, useEffect, useRef } from "react";
import { FiPauseCircle, FiPlayCircle, FiRepeat, FiRewind } from "react-icons/fi";

interface TextToSpeechPlayerProps {
	text: string;
	displayText?: boolean;
	mp3File?: string;
}

const TextToSpeechPlayer: React.FC<TextToSpeechPlayerProps> = ({ text, displayText = false, mp3File = "" }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [isRepeating, setIsRepeating] = useState(false);
	const [isRestarting, setIsRestarting] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const utteranceRef = useRef(new SpeechSynthesisUtterance(text));
	utteranceRef.current.lang = "de-DE";

	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Listen to the time update event and update the currentTime state
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener("timeupdate", () => {
				if (audioRef.current) {
					setCurrentTime(audioRef.current.currentTime);
				}
			});

			audioRef.current.addEventListener("loadedmetadata", function () {
				if (audioRef.current) {
					setDuration(audioRef.current.duration);
				}
			});
		}
	}, [audioRef.current]);

	useEffect(() => {
		utteranceRef.current.text = text;

		if (mp3File?.endsWith(".mp3")) {
			audioRef.current = new Audio(mp3File);
		}
	}, [text, mp3File]);

	useEffect(() => {
		if (audioRef.current) {
			const handleEnd = () => {
				if (isRepeating) {
					handleRestart();
				}
			};

			// Add or remove the event listener based on isRepeating
			if (isRepeating) {
				audioRef.current.addEventListener("ended", handleEnd);
			} else {
				audioRef.current.removeEventListener("ended", handleEnd);
			}
		}
	}, [isRepeating]);

	const handleProgressBarClick = (event: any) => {
		const newTime = event.target.value;
		setCurrentTime(newTime);
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
		}
	};

	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
			setIsPaused(false);
		} else {
			utteranceRef.current.rate = 0.8;
			utteranceRef.current.pitch = 1;
			window.speechSynthesis.cancel();
			setIsPlaying(true);
			setIsPaused(false);

			const voices = window.speechSynthesis.getVoices();
			const selectedVoice = voices.find((voice) => voice.lang === "de-DE");
			if (selectedVoice) {
				utteranceRef.current.voice = selectedVoice;
			}
			window.speechSynthesis.speak(utteranceRef.current);
		}
	};

	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
			setIsPaused(true);
		} else {
			setIsPaused(true);
			setIsPlaying(false);
			window.speechSynthesis.pause();
		}
	};

	const handleResume = () => {
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
			setIsPaused(false);
		} else {
			setIsPaused(false);
			setIsPlaying(true);
			window.speechSynthesis.resume();
		}
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
		if (audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else {
			window.speechSynthesis.cancel();
			setIsPlaying(false);
			setIsPaused(false);
			setIsRestarting(true);
		}
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
		<>
			{displayText ? <p className={`bg-primary-200 dark:bg-primary-800`}>{text}</p> : <></>}
			<div className="bg-green-200 rounded-lg p-4 flex items-center justify-center space-x-4 shadow-lg hover:shadow-xl">
				<button onClick={handleRestart} className="hover:bg-green-300 hover:text-white rounded-full p-2">
					<FiRewind size={24} />
				</button>
				<button onClick={handlePlayPause} className="hover:bg-green-300 hover:text-white rounded-full p-2">
					{isPlaying ? <FiPauseCircle size={24} /> : <FiPlayCircle size={24} />}
				</button>
				<button onClick={handleRepeat} className="hover:bg-green-300 hover:text-white rounded-full p-2">
					<FiRepeat size={24} className={`${isRepeating && "text-green-600 rounded-full"}`} />
				</button>
				{mp3File && <input type="range" min={0} max={duration} value={currentTime} onChange={handleProgressBarClick} className="w-full slider accent-slate-600" />}
			</div>
		</>
	);
};

export default TextToSpeechPlayer;

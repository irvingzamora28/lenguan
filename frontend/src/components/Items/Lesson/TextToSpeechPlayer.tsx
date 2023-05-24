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
	const [playbackRate, setPlaybackRate] = useState(1); // New state for playback rate

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

	// Set the playback rate on the audio element whenever it changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.playbackRate = playbackRate;
		}
	}, [playbackRate]);

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
			<div className="bg-green-200 rounded-lg p-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 shadow-lg hover:shadow-xl">
				<div className="flex items-center justify-center space-x-4">
					{mp3File && (
						<div className="inline-block relative w-24">
							<select
								value={playbackRate}
								onChange={(e) => setPlaybackRate(Number(e.target.value))}
								className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
							>
								<option value={0.5}>0.5x</option>
								<option value={1}>1x</option>
								<option value={1.5}>1.5x</option>
								<option value={2}>2x</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M10 12l-6-5h12l-6 5z" />
								</svg>
							</div>
						</div>
					)}
					<button onClick={handleRestart} className="hover:bg-green-300 hover:text-white rounded-full p-2">
						<FiRewind size={24} />
					</button>
					<button onClick={handlePlayPause} className="hover:bg-green-300 hover:text-white rounded-full p-2">
						{isPlaying ? <FiPauseCircle size={24} /> : <FiPlayCircle size={24} />}
					</button>
					<button onClick={handleRepeat} className="hover:bg-green-300 hover:text-white rounded-full p-2">
						<FiRepeat size={24} className={`${isRepeating && "text-green-600 rounded-full"}`} />
					</button>
				</div>
				{mp3File && (
					<div className="w-full md:w-auto">
						<input type="range" min={0} max={duration} value={currentTime} onChange={handleProgressBarClick} className="w-full md:w-auto slider accent-slate-600" />
					</div>
				)}
			</div>
		</>
	);
};

export default TextToSpeechPlayer;

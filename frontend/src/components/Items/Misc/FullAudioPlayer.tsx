import { ChangeEvent, MouseEventHandler } from "react";
import { AudioPlayerProps } from "../../../types/props";
import AudioPlayerControls from "./AudioPlayerControls";
import AudioPlayerProgressBar from "./AudioPlayerProgressBar";
import AudioPlayerPlaybackSpeed from "./AudioPlayerPlaybackSpeed";

interface FullAudioPlayerProps extends AudioPlayerProps {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	playbackRate: number;
	setPlaybackRate: (value: number) => void;
	isRepeating: boolean;
	handleRepeat: MouseEventHandler<HTMLButtonElement>;
	handleRestart: MouseEventHandler<HTMLButtonElement>;
	handleAudioPlayerProgressBarClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FullAudioPlayer: React.FC<FullAudioPlayerProps> = ({ isPlaying, currentTime, duration, playbackRate, setPlaybackRate, isRepeating, handlePlayPause, handleRepeat, handleRestart, handleAudioPlayerProgressBarClick }) => (
	<div className="bg-primary-200 rounded-lg p-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 shadow-lg hover:shadow-xl">
		<AudioPlayerControls isPlaying={isPlaying} isRepeating={isRepeating} handlePlayPause={handlePlayPause} handleRepeat={handleRepeat} handleRestart={handleRestart} />
		<AudioPlayerProgressBar currentTime={currentTime} duration={duration} handleAudioPlayerProgressBarClick={handleAudioPlayerProgressBarClick} />
		<AudioPlayerPlaybackSpeed playbackRate={playbackRate} setPlaybackRate={setPlaybackRate} />
	</div>
);

export default FullAudioPlayer;

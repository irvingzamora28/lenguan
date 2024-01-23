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
	<div className="flex flex-col items-center w-full md:w-auto mx-auto my-5 md:my-8">
		<div className="bg-primary-200 rounded-lg p-4 shadow-lg hover:shadow-xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
			<div className="flex flex-row justify-center md:justify-start space-x-4">
				<AudioPlayerControls isPlaying={isPlaying} isRepeating={isRepeating} handlePlayPause={handlePlayPause} handleRepeat={handleRepeat} handleRestart={handleRestart} />

				<AudioPlayerPlaybackSpeed playbackRate={playbackRate} setPlaybackRate={setPlaybackRate} />
			</div>
			<div className="w-full self-center">
				<AudioPlayerProgressBar currentTime={currentTime} duration={duration} handleAudioPlayerProgressBarClick={handleAudioPlayerProgressBarClick} />
			</div>
		</div>
	</div>
);

export default FullAudioPlayer;

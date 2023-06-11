import useAudioPlayer from "../../../hooks/useAudioPlayer";
import FullAudioPlayer from "./FullAudioPlayer";
import MiniAudioPlayer from "./MiniAudioPlayer";

interface TextToSpeechPlayerProps {
	text: string;
	displayText?: boolean;
	miniPlayer?: boolean;
	mp3File?: string;
}

const TextToSpeechPlayer: React.FC<TextToSpeechPlayerProps> = ({ text, displayText = false, miniPlayer = false, mp3File = "" }) => {
	const { isPlaying, currentTime, duration, playbackRate, setPlaybackRate, isRepeating, handlePlayPause, handleRepeat, handleAudioPlayerProgressBarClick } = useAudioPlayer({ text, mp3File });

	return (
		<>
			{displayText && <p className={`bg-primary-200 dark:bg-primary-800`}>{text}</p>}
			{miniPlayer ? (
				<MiniAudioPlayer isPlaying={isPlaying} handlePlayPause={handlePlayPause} />
			) : (
				<FullAudioPlayer
					isPlaying={isPlaying}
					currentTime={currentTime}
					duration={duration}
					playbackRate={playbackRate}
					setPlaybackRate={setPlaybackRate}
					isRepeating={isRepeating}
					handlePlayPause={handlePlayPause}
					handleRepeat={handleRepeat}
					handleAudioPlayerProgressBarClick={handleAudioPlayerProgressBarClick}
				/>
			)}
		</>
	);
};

export default TextToSpeechPlayer;

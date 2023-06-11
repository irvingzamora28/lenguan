import { MouseEventHandler } from "react";
import { AudioPlayerProps } from "../../../types/props";
import { FiPauseCircle, FiPlayCircle, FiRepeat } from "react-icons/fi";

interface AudioPlayerControlsProps extends AudioPlayerProps {
	isRepeating: boolean;
	handleRepeat: MouseEventHandler<HTMLButtonElement>;
}

const AudioPlayerControls: React.FC<AudioPlayerControlsProps> = ({ isPlaying, handlePlayPause, handleRepeat, isRepeating }) => (
	<div className="flex items-center justify-center space-x-4">
		<button onClick={handlePlayPause} className="hover:bg-primary-300 hover:text-maintextalt rounded-full p-2">
			{isPlaying ? <FiPauseCircle size={24} /> : <FiPlayCircle size={24} />}
		</button>
		<button onClick={handleRepeat} className="hover:bg-primary-300 hover:text-maintextalt rounded-full p-2">
			<FiRepeat size={24} className={`${isRepeating && "text-primary-600 rounded-full"}`} />
		</button>
	</div>
);

export default AudioPlayerControls;

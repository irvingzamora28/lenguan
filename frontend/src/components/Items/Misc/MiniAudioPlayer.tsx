import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { AudioPlayerProps } from "../../../types/props";

const MiniAudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, handlePlayPause }) => (
	<div className="bg-primary-200 inline-flex w-fit rounded-lg p-0 md:flex-row items-center justify-center md:space-y-0 md:space-x-4 shadow-lg hover:shadow-xl dark:bg-indigo-500">
		<div className="flex items-center justify-center space-x-4">
			<button onClick={handlePlayPause} className="hover:bg-primary-300 hover:text-maintextalt rounded-full p-2 dark:hover:bg-indigo-900">
				{isPlaying ? <FiPauseCircle size={16} data-testid="testid-pause-icon" /> : <FiPlayCircle size={16} data-testid="testid-play-icon" />}
			</button>
		</div>
	</div>
);

export default MiniAudioPlayer;

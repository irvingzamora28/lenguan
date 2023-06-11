import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { AudioPlayerProps } from "../../../types/props";

const MiniAudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, handlePlayPause }) => (
	<div className="bg-primary-200 inline-flex w-fit rounded-lg p-0 md:flex-row items-center justify-center md:space-y-0 md:space-x-4 shadow-lg hover:shadow-xl">
		<div className="flex items-center justify-center space-x-4">
			<button onClick={handlePlayPause} className="hover:bg-primary-300 hover:text-maintextalt rounded-full p-2">
				{isPlaying ? <FiPauseCircle size={16} /> : <FiPlayCircle size={16} />}
			</button>
		</div>
	</div>
);

export default MiniAudioPlayer;

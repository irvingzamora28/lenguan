interface AudioPlayerPlaybackSpeedProps {
	playbackRate: number;
	setPlaybackRate: (value: number) => void;
}

const AudioPlayerPlaybackSpeed: React.FC<AudioPlayerPlaybackSpeedProps> = ({ playbackRate, setPlaybackRate }) => (
	<div className="inline-block relative w-24">
		<select
			value={playbackRate}
			onChange={(e) => setPlaybackRate(Number(e.target.value))}
			className="block appearance-none w-full bg-backgroundalt border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
		>
			<option value={0.5}>0.5x</option>
			<option value={1}>1x</option>
			<option value={1.5}>1.5x</option>
			<option value={2}>2x</option>
		</select>
	</div>
);

export default AudioPlayerPlaybackSpeed;

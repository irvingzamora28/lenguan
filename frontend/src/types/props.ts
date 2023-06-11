import { MouseEventHandler } from "react";

export interface AudioPlayerProps {
	isPlaying: boolean;
	handlePlayPause: MouseEventHandler<HTMLButtonElement>;
}

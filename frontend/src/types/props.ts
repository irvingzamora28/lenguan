import { ChangeEvent, MouseEventHandler } from "react";

export interface AudioPlayerProps {
	isPlaying: boolean;
	handlePlayPause: MouseEventHandler<HTMLButtonElement>;
}

export interface AudioPlayerProgressBarProps {
	currentTime: number;
	duration: number;
	handleAudioPlayerProgressBarClick: (event: ChangeEvent<HTMLInputElement>) => void;
}

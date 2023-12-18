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

export interface ErrorBannerProps {
	message?: string | null;
}

export interface TestimonialCardProps {
	image: string;
	name: string;
	designation: string;
	testimonial: string;
}

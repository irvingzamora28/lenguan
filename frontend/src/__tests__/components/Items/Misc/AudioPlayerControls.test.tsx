import { describe, it, beforeEach, vi, Mock } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import AudioPlayerControls from "./../../../../components/Items/Misc/AudioPlayerControls";

describe("AudioPlayerControls", () => {
	let mockHandlePlayPause: Mock;
	let mockHandleRepeat: Mock;
	let mockHandleRestart: Mock;

	beforeEach(() => {
		mockHandlePlayPause = vi.fn();
		mockHandleRepeat = vi.fn();
		mockHandleRestart = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders the restart button", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		expect(screen.getByTestId("testid-restart-button")).toBeInTheDocument();
	});

	it("renders the play/pause button", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		expect(screen.getByTestId("testid-playpause-button")).toBeInTheDocument();
	});

	it("renders the repeat button", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		expect(screen.getByTestId("testid-repeat-button")).toBeInTheDocument();
	});

	it("renders the play icon when isPlaying is false", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);

		expect(screen.queryByTestId("testid-play-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("testid-pause-icon")).not.toBeInTheDocument();
	});

	it("renders the pause icon when isPlaying is true", () => {
		render(<AudioPlayerControls isPlaying={true} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		expect(screen.queryByTestId("testid-play-icon")).not.toBeInTheDocument();
		expect(screen.queryByTestId("testid-pause-icon")).toBeInTheDocument();
	});

	it("calls the handlePlayPause function when the play/pause button is clicked", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		const playButton = screen.getByTestId("testid-playpause-button");
		fireEvent.click(playButton);
		expect(mockHandlePlayPause).toHaveBeenCalledTimes(1);
	});

	it("calls the handleRepeat function when the repeat button is clicked", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		const repeatButton = screen.getByTestId("testid-repeat-button");
		fireEvent.click(repeatButton);
		expect(mockHandleRepeat).toHaveBeenCalledTimes(1);
	});

	it("calls the handleRestart function when the rewind button is clicked", () => {
		render(<AudioPlayerControls isPlaying={false} isRepeating={false} handlePlayPause={mockHandlePlayPause} handleRepeat={mockHandleRepeat} handleRestart={mockHandleRestart} />);
		const rewindButton = screen.getByTestId("testid-restart-button");
		fireEvent.click(rewindButton);
		expect(mockHandleRestart).toHaveBeenCalledTimes(1);
	});
});

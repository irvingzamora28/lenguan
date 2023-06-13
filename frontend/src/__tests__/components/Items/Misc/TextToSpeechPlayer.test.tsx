import { render } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import TextToSpeechPlayer from "./../../../../components/Items/Misc/TextToSpeechPlayer";
import useAudioPlayer from "../../../../hooks/useAudioPlayer";
import MiniAudioPlayer from "./../../../../components/Items/Misc/MiniAudioPlayer";
import FullAudioPlayer from "./../../../../components/Items/Misc/FullAudioPlayer";

vi.mock("../../../../hooks/useAudioPlayer");
vi.mock("./../../../../components/Items/Misc/MiniAudioPlayer");
vi.mock("./../../../../components/Items/Misc/FullAudioPlayer");

describe("TextToSpeechPlayer", () => {
	beforeEach(() => {
		(useAudioPlayer as vi.Mock).mockReturnValue({
			isPlaying: true,
			isPaused: false,
			isRepeating: false,
			isRestarting: false,
			currentTime: 0,
			duration: 120,
			playbackRate: 1,
			handleAudioPlayerProgressBarClick: vi.fn(),
			handlePlayPause: vi.fn(),
			handleRepeat: vi.fn(),
			handleRestart: vi.fn(),
			setPlaybackRate: vi.fn(),
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("displays the text when the displayText prop is true", () => {
		const { getByText } = render(<TextToSpeechPlayer text="Test text" displayText={true} />);
		expect(getByText("Test text")).toBeInTheDocument();
	});

	it("renders MiniAudioPlayer when miniPlayer prop is true", () => {
		(MiniAudioPlayer as vi.Mock).mockReturnValue(<div>MiniAudioPlayer</div>);
		render(<TextToSpeechPlayer text="Test text" miniPlayer={true} />);
		expect(MiniAudioPlayer).toHaveBeenCalled();
	});

	it("renders FullAudioPlayer when miniPlayer prop is false", () => {
		(FullAudioPlayer as vi.Mock).mockReturnValue(<div>FullAudioPlayer</div>);
		render(<TextToSpeechPlayer text="Test text" miniPlayer={false} />);
		expect(FullAudioPlayer).toHaveBeenCalled();
	});

	it("calls useAudioPlayer with correct parameters", () => {
		render(<TextToSpeechPlayer text="Test text" mp3File="testFile.mp3" />);
		expect(useAudioPlayer).toHaveBeenCalledWith({ text: "Test text", mp3File: "testFile.mp3" });
	});

	it("passes correct props to MiniAudioPlayer when miniPlayer is true", () => {
		render(<TextToSpeechPlayer text="Test text" miniPlayer={true} />);
		expect(MiniAudioPlayer).toHaveBeenCalledWith(expect.objectContaining({ isPlaying: true, handlePlayPause: expect.any(Function) }), {});
	});

	it("passes correct props to FullAudioPlayer when miniPlayer is false", () => {
		render(<TextToSpeechPlayer text="Test text" miniPlayer={false} />);
		expect(FullAudioPlayer).toHaveBeenCalledWith(
			expect.objectContaining({
				isPlaying: true,
				currentTime: 0,
				duration: 120,
				playbackRate: 1,
				isRepeating: false,
				handlePlayPause: expect.any(Function),
				handleRepeat: expect.any(Function),
				handleRestart: expect.any(Function),
				handleAudioPlayerProgressBarClick: expect.any(Function),
				setPlaybackRate: expect.any(Function),
			}),
			{}
		);
	});
});

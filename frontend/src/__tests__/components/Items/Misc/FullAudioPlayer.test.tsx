import { describe, it, beforeEach, vi, Mock } from "vitest";
import { render } from "@testing-library/react";
import FullAudioPlayer from "./../../../../components/Items/Misc/FullAudioPlayer";
import AudioPlayerControls from "./../../../../components/Items/Misc/AudioPlayerControls";
import AudioPlayerProgressBar from "./../../../../components/Items/Misc/AudioPlayerProgressBar";
import AudioPlayerPlaybackSpeed from "./../../../../components/Items/Misc/AudioPlayerPlaybackSpeed";

vi.mock("./../../../../components/Items/Misc/AudioPlayerControls");
vi.mock("./../../../../components/Items/Misc/AudioPlayerProgressBar");
vi.mock("./../../../../components/Items/Misc/AudioPlayerPlaybackSpeed");

describe("FullAudioPlayer", () => {
	let mockHandlePlayPause: Mock;
	let mockHandleRepeat: Mock;
	let mockHandleRestart: Mock;
	let mockHandleAudioPlayerProgressBarClick: Mock;
	let mockSetPlaybackRate: Mock;

	beforeEach(() => {
		mockHandlePlayPause = vi.fn();
		mockHandleRepeat = vi.fn();
		mockHandleRestart = vi.fn();
		mockHandleAudioPlayerProgressBarClick = vi.fn();
		mockSetPlaybackRate = vi.fn();
        (AudioPlayerControls as Mock).mockReturnValue(<div>AudioPlayerControls</div>);
        (AudioPlayerProgressBar as Mock).mockReturnValue(<div>AudioPlayerProgressBar</div>);
        (AudioPlayerPlaybackSpeed as Mock).mockReturnValue(<div>AudioPlayerPlaybackSpeed</div>);
	});

	afterEach(() => {
		vi.clearAllMocks();
    });

    it("passes correct props to AudioPlayerControls", () => {
        render(
          <FullAudioPlayer
            isPlaying={true}
            currentTime={0}
            duration={120}
            playbackRate={1}
            setPlaybackRate={mockSetPlaybackRate}
            isRepeating={false}
            handlePlayPause={mockHandlePlayPause}
            handleRepeat={mockHandleRepeat}
            handleRestart={mockHandleRestart}
            handleAudioPlayerProgressBarClick={mockHandleAudioPlayerProgressBarClick}
          />
        );

        expect(AudioPlayerControls).toHaveBeenCalledWith(
          expect.objectContaining({
            isPlaying: true,
            isRepeating: false,
            handlePlayPause: expect.any(Function),
            handleRepeat: expect.any(Function),
            handleRestart: expect.any(Function),
          }),
          {}
        );
      });


	it("passes down the correct props to AudioPlayerProgressBar", () => {
		render(
			<FullAudioPlayer
				isPlaying={true}
				currentTime={10}
				duration={20}
				playbackRate={1}
				setPlaybackRate={mockSetPlaybackRate}
				isRepeating={false}
				handlePlayPause={mockHandlePlayPause}
				handleRepeat={mockHandleRepeat}
				handleRestart={mockHandleRestart}
				handleAudioPlayerProgressBarClick={mockHandleAudioPlayerProgressBarClick}
			/>
		);

		expect(AudioPlayerProgressBar).toHaveBeenCalledWith(
			expect.objectContaining({
				currentTime: 10,
				duration: 20,
				handleAudioPlayerProgressBarClick: mockHandleAudioPlayerProgressBarClick,
			}),
			{}
		);
	});

	it("passes down the correct props to AudioPlayerPlaybackSpeed", () => {
		render(
			<FullAudioPlayer
				isPlaying={true}
				currentTime={10}
				duration={20}
				playbackRate={1}
				setPlaybackRate={mockSetPlaybackRate}
				isRepeating={false}
				handlePlayPause={mockHandlePlayPause}
				handleRepeat={mockHandleRepeat}
				handleRestart={mockHandleRestart}
				handleAudioPlayerProgressBarClick={mockHandleAudioPlayerProgressBarClick}
			/>
		);

		expect(AudioPlayerPlaybackSpeed).toHaveBeenCalledWith(
			expect.objectContaining({
				playbackRate: 1,
				setPlaybackRate: mockSetPlaybackRate,
			}),
			{}
		);
	});

});

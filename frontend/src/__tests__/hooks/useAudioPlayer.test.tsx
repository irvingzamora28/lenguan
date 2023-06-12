import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import useAudioPlayer from "./../../hooks/useAudioPlayer";

describe("useAudioPlayer hook", () => {
	beforeAll(() => {
		// Mock window.speechSynthesis
		Object.defineProperty(window, "speechSynthesis", {
			value: {
				cancel: vi.fn(),
				pause: vi.fn(),
				resume: vi.fn(),
				speak: vi.fn(),
				getVoices: vi.fn().mockReturnValue([{ lang: "de-DE", voiceURI: "native" }]),
			},
			writable: true,
			configurable: true,
		});
	});

	global.SpeechSynthesisUtterance = vi.fn();

	it("should initialize with a new SpeechSynthesisUtterance instance", () => {
		const speechSynthesisUtteranceSpy = vi.spyOn(window, "SpeechSynthesisUtterance");

		renderHook(() => useAudioPlayer({ text: "Test", mp3File: "" }));

		expect(speechSynthesisUtteranceSpy).toHaveBeenCalled();
	});

	it("should handle play/pause correctly", () => {
		const { result } = renderHook(() => useAudioPlayer({ text: "Test", mp3File: "" }));

		// Test play functionality
		act(() => {
			result.current.handlePlayPause();
		});

		expect(result.current.isPlaying).toBeTruthy();

		// Test pause functionality
		act(() => {
			result.current.handlePlayPause();
		});

		expect(result.current.isPlaying).toBeFalsy();
		expect(result.current.isPaused).toBeTruthy();
	});

	it("should handle restart correctly", () => {
		const { result } = renderHook(() => useAudioPlayer({ text: "Test", mp3File: "" }));

		act(() => {
			result.current.handleRestart();
		});

		expect(result.current.isPlaying).toBeTruthy();
		expect(result.current.isRestarting).toBeTruthy();
	});

	it("should handle repeat correctly", () => {
		const { result } = renderHook(() => useAudioPlayer({ text: "Test", mp3File: "" }));

		act(() => {
			result.current.handleRepeat();
		});

		expect(result.current.isRepeating).toBeTruthy();

		act(() => {
			result.current.handleRepeat();
		});

		expect(result.current.isRepeating).toBeFalsy();
	});

	it("should handle progress bar click correctly", () => {
		const { result } = renderHook(() => useAudioPlayer({ text: "Test", mp3File: "" }));

		act(() => {
			result.current.handleAudioPlayerProgressBarClick({
				target: { value: "30" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.currentTime).toBe(30);
	});
});

import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi, Mock } from "vitest";
import AudioPlayerPlaybackSpeed from "./../../../../components/Items/Misc/AudioPlayerPlaybackSpeed";

describe("AudioPlayerPlaybackSpeed", () => {
	let setPlaybackRate: Mock;
	beforeEach(() => {
		setPlaybackRate = vi.fn();
	});

	it("renders with correct initial value", () => {
		const { getByDisplayValue } = render(<AudioPlayerPlaybackSpeed playbackRate={1} setPlaybackRate={setPlaybackRate} />);
		expect(getByDisplayValue("1x")).toBeInTheDocument();
	});

	it("renders all options correctly", () => {
		const { getByText } = render(<AudioPlayerPlaybackSpeed playbackRate={1} setPlaybackRate={setPlaybackRate} />);
		expect(getByText("0.5x")).toBeInTheDocument();
		expect(getByText("1x")).toBeInTheDocument();
		expect(getByText("1.5x")).toBeInTheDocument();
		expect(getByText("2x")).toBeInTheDocument();
	});

	it("changes value when different option is selected", () => {
		const { getByDisplayValue } = render(<AudioPlayerPlaybackSpeed playbackRate={1} setPlaybackRate={setPlaybackRate} />);
		fireEvent.change(getByDisplayValue("1x"), { target: { value: "0.5" } });
		expect(setPlaybackRate).toHaveBeenCalledWith(0.5);
	});

	it("handles multiple select changes correctly", () => {
		const { getByDisplayValue } = render(<AudioPlayerPlaybackSpeed playbackRate={1} setPlaybackRate={setPlaybackRate} />);
		fireEvent.change(getByDisplayValue("1x"), { target: { value: "0.5" } });
		expect(setPlaybackRate).toHaveBeenLastCalledWith(0.5);
		fireEvent.change(getByDisplayValue("1x"), { target: { value: "1.5" } });
		expect(setPlaybackRate).toHaveBeenLastCalledWith(1.5);
		expect(setPlaybackRate).toHaveBeenCalledTimes(2);
	});
});

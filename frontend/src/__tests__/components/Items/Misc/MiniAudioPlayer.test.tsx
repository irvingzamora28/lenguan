import { describe, it, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import MiniAudioPlayer from "./../../../../components/Items/Misc/MiniAudioPlayer";

describe("MiniAudioPlayer", () => {
  let mockHandlePlayPause: vi.Mock;

  beforeEach(() => {
    mockHandlePlayPause = vi.fn();
  });

  it("renders a play icon when isPlaying is false", () => {
    render(<MiniAudioPlayer isPlaying={false} handlePlayPause={mockHandlePlayPause} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("testid-play-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("testid-pause-icon")).not.toBeInTheDocument();
  });

  it("renders a pause icon when isPlaying is true", () => {
    render(<MiniAudioPlayer isPlaying={true} handlePlayPause={mockHandlePlayPause} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("testid-pause-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("testid-play-icon")).not.toBeInTheDocument();
  });

  it("calls handlePlayPause when the button is clicked", () => {
    render(<MiniAudioPlayer isPlaying={false} handlePlayPause={mockHandlePlayPause} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockHandlePlayPause).toHaveBeenCalled();
  });
});

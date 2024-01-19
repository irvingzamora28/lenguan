import { renderHook, act } from "@testing-library/react-hooks";
import useGenderDuelSocket from "../../hooks/useGenderDuelSocket";
import socket from "../../../socket-server/socket";
import { vi, Mocked, MockedFunction } from "vitest";

vi.mock("../../socket-server/socket");

beforeEach(() => {
	vi.clearAllMocks();
});

describe("useGenderDuelSocket hook", () => {
	const mockLanguage = {
		_id: "1",
		name: "English",
		code: "en",
	};

	it("should handle initial state", () => {
		socket.emit = vi.fn();
		socket.on = vi.fn();
		socket.off = vi.fn();

		const { result } = renderHook(() => useGenderDuelSocket("testuser", mockLanguage));

		expect(result.current.connectionError).toBeFalsy();
		expect(result.current.playerNumber).toBeNull();
		expect(result.current.gameStatus).toEqual("waiting");
		expect(result.current.word).toBeNull();
		expect(result.current.players).toEqual({});
		expect(result.current.appearing).toBeFalsy();
		expect(result.current.correctGender).toBeNull();
		expect(result.current.incorrectGender).toBeNull();
	});

	it("should handle 'player-assignment' event", () => {
		socket.emit = vi.fn();
		socket.on = vi.fn().mockImplementation((event, cb) => {
			if (event === "player-assignment") {
				cb({ playerNumber: 1, connectedPlayers: 1, maxPlayers: 2 });
			}
		});
		socket.off = vi.fn();

		const { result } = renderHook(() => useGenderDuelSocket("testuser", mockLanguage));

		expect(result.current.playerNumber).toEqual(1);
		expect(result.current.gameStatus).toEqual("waiting-for-opponent");
		expect(result.current.playerNumber).toEqual(1);
	});

	it("should handle gender click correctly", () => {
		const word = { gender: "der", word: "Haus", translation: "House", difficulty_level: 1, category: "Housing" };
		socket.emit = vi.fn();
		socket.on = vi.fn().mockImplementation((event, cb) => {
			if (event === "new-word") {
				cb(word);
			}
		});
		socket.off = vi.fn();

		const { result } = renderHook(() => useGenderDuelSocket("testuser", mockLanguage));

		act(() => {
			result.current.handleGenderClick("der");
		});

		expect(socket.emit).toHaveBeenCalledWith("correct-gender-clicked", "der");
		expect(result.current.correctGender).toBe("der");
		expect(result.current.incorrectGender).toBeNull();
	});

	it("should handle gender click incorrectly", () => {
		const word = { word: "Katze", gender: "die", translation: "cat", difficulty_level: 1, category: "Animals" };
		socket.emit = vi.fn();
		socket.on = vi.fn().mockImplementation((event, cb) => {
			if (event === "new-word") {
				cb(word);
			}
		});
		socket.off = vi.fn();

		const { result } = renderHook(() => useGenderDuelSocket("testuser", mockLanguage));

		act(() => {
			result.current.handleGenderClick("der");
		});

		expect(result.current.incorrectGender).toBe("der");
		expect(result.current.correctGender).toBeNull();
	});
});

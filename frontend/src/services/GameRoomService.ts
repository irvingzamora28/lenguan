import api from "../utils/api.ts";

export interface GameRoom {
	_id: string;
	room_code: string;
	players: string[];
	game_state: string;
	created_at?: string;
	updated_at?: string;
}

export class GameRoomService {
	private static gameRooms: GameRoom[] = [];

	/**
	 * Fetch the details of a specific game room by its ID
	 * @param gameRoomId The ID of the game room
	 */
	public static async fetchGameRoom(gameRoomId: string): Promise<GameRoom | null> {
		try {
			const response = await api.get(`/api/game-rooms/${gameRoomId}`);
			const data: GameRoom = await response.data;
			return data;
		} catch (error) {
			console.error("Error fetching game room:", error);
			throw error;
		}
	}

	/**
	 * Create a new game room
	 * @param userId The ID of the user creating the game room
     * @param isGuest Tells if the user is guest or not
	 */
	public static async createGameRoom(userId: string, isGuest: boolean): Promise<GameRoom> {
		try {
			const response = await api.post("/api/game-rooms", { user_id: userId, is_guest: isGuest });
			const data: GameRoom = await response.data;
			GameRoomService.gameRooms.push(data);
			return data;
		} catch (error) {
			console.error("Error creating game room:", error);
			throw error;
		}
	}

	/**
	 * Join an existing game room
	 * @param gameRoomId The ID of the game room to join
	 * @param userId The ID of the user joining the game room
	 */
	public static async joinGameRoom(gameRoomId: string, userId: string): Promise<GameRoom> {
		try {
			const response = await api.post(`/api/game-rooms/${gameRoomId}/join`, { userId });
			const data: GameRoom = await response.data;
			const gameRoomIndex = GameRoomService.gameRooms.findIndex((gameRoom) => gameRoom._id === gameRoomId);

			if (gameRoomIndex !== -1) {
				GameRoomService.gameRooms[gameRoomIndex] = data;
			} else {
				GameRoomService.gameRooms.push(data);
			}

			return data;
		} catch (error) {
			console.error("Error joining game room:", error);
			throw error;
		}
	}

	/**
	 * Update the state of a specific game room
	 * @param gameRoomId The ID of the game room to update
	 * @param gameState The new game state
	 */
	public static async updateGameRoomState(gameRoomId: string, gameState: string): Promise<void> {
		try {
			await api.patch(`/api/game-rooms/${gameRoomId}`, { game_state: gameState });
			const gameRoomIndex = GameRoomService.gameRooms.findIndex((gameRoom) => gameRoom._id === gameRoomId);

			if (gameRoomIndex !== -1) {
				GameRoomService.gameRooms[gameRoomIndex].game_state = gameState;
				GameRoomService.gameRooms[gameRoomIndex].updated_at = new Date().toISOString();
			}
		} catch (error) {
			console.error("Error updating game room state:", error);
			throw error;
		}
	}

	/**
	 * Get the current state of the game rooms
	 */
	public static getGameRooms(): GameRoom[] {
		return GameRoomService.gameRooms;
	}
}

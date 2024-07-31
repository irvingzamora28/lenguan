<?php

namespace App\Services;

use App\Models\GameRoom;
use Illuminate\Database\Eloquent\Collection;

class GameRoomService
{
    public function getAllGameRooms(): Collection
    {
        return GameRoom::all();
    }

    public function getGameRoomById(string $id): ?GameRoom
    {
        return GameRoom::find($id);
    }

    public function createGameRoom(string $userId, int $maxPlayers): GameRoom
    {
        $roomCode = $this->generateRoomCode();
        $gameRoom = GameRoom::create([
            'room_code' => $roomCode,
            'players' => [$userId],
            'game_state' => 'waiting',
            'max_players' => $maxPlayers,
        ]);

        return $gameRoom;
    }

    public function joinGameRoom(string $roomId, string $userId): ?GameRoom
    {
        $gameRoom = GameRoom::find($roomId);
        if ($gameRoom) {
            $players = $gameRoom->players;
            if (!in_array($userId, $players)) {
                $players[] = $userId;
                $gameRoom->update(['players' => $players]);
            }
        }

        return $gameRoom;
    }

    public function updateGameRoomState(string $roomId, string $gameState): ?GameRoom
    {
        $gameRoom = GameRoom::find($roomId);
        if ($gameRoom) {
            $gameRoom->update(['game_state' => $gameState]);
        }

        return $gameRoom;
    }

    private function generateRoomCode(): string
    {
        return strtoupper(bin2hex(random_bytes(3)));
    }
}

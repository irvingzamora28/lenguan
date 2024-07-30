<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameRoomRequest;
use App\Http\Requests\UpdateGameRoomRequest;
use App\Services\GameRoomService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameRoomController extends Controller
{
    private $gameRoomService;

    public function __construct(GameRoomService $gameRoomService)
    {
        $this->gameRoomService = $gameRoomService;
    }

    public function index(): JsonResponse
    {
        $gameRooms = $this->gameRoomService->getAllGameRooms();
        return response()->json($gameRooms);
    }

    public function show(string $gameRoomId): JsonResponse
    {
        $gameRoom = $this->gameRoomService->getGameRoomById($gameRoomId);
        return response()->json($gameRoom);
    }

    public function store(StoreGameRoomRequest $request): JsonResponse
    {
        $userId = $request->input('user_id');
        $gameRoom = $this->gameRoomService->createGameRoom($userId);
        return response()->json($gameRoom);
    }

    public function join(Request $request, string $gameRoomId): JsonResponse
    {
        $userId = $request->input('user_id');
        $gameRoom = $this->gameRoomService->joinGameRoom($gameRoomId, $userId);
        return response()->json($gameRoom);
    }

    public function update(UpdateGameRoomRequest $request, string $gameRoomId): JsonResponse
    {
        $gameState = $request->input('game_state');
        $gameRoom = $this->gameRoomService->updateGameRoomState($gameRoomId, $gameState);
        return response()->json($gameRoom);
    }
}

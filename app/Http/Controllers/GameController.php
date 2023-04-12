<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        // Retrieve all game sessions
        $gameSessions = GameSession::all();
        return response()->json($gameSessions);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'player1_id' => 'required',
            'player2_id' => 'required',
            'mode' => 'required',
            'language_id' => 'required',
            'difficulty_level' => 'required',
        ]);

        // Create a new game session
        $gameSession = GameSession::create($request->all());
        return response()->json($gameSession, 201);
    }

    public function show(GameSession $gameSession)
    {
        // Retrieve a specific game session
        return response()->json($gameSession);
    }

    public function update(Request $request, GameSession $gameSession)
    {
        // Validate the request
        $request->validate([
            'player1_id' => 'required',
            'player2_id' => 'required',
            'mode' => 'required',
            'language_id' => 'required',
            'difficulty_level' => 'required',
        ]);

        // Update the game session
        $gameSession->update($request->all());
        return response()->json($gameSession, 200);
    }

    public function destroy(GameSession $gameSession)
    {
        // Delete the game session
        $gameSession->delete();
        return response()->json(null, 204);
    }
}

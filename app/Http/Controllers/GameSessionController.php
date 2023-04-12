<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use Illuminate\Http\Request;

class GameSessionController extends Controller
{
    public function index()
    {
        $gameSessions = GameSession::all();
        return response()->json($gameSessions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'player1_id' => 'required',
            'player2_id' => 'nullable',
            'mode' => 'required',
            'language_id' => 'required',
            'difficulty_level' => 'required',
        ]);

        $gameSession = GameSession::create($request->all());
        return response()->json($gameSession, 201);
    }

    public function show(GameSession $gameSession)
    {
        return response()->json($gameSession);
    }
}

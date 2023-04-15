<?php

namespace App\Http\Controllers;

use App\Models\GameRound;
use App\Models\GameSession;
use App\Models\Noun;
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

    public function fetchNouns(Request $request)
    {
        $difficulty_level = $request->input('difficulty_level');
        $language_id = $request->input('language_id');

        $nouns = Noun::where('difficulty_level', $difficulty_level)
            ->where('language_id', $language_id)
            ->get();

        return response()->json($nouns);
    }

    public function submitAnswer(Request $request)
    {
        $noun_id = $request->input('noun_id');
        $selected_gender = $request->input('selected_gender');
        $player_id = $request->input('player_id');

        $noun = Noun::find($noun_id);

        if (!$noun) {
            return response()->json(['error' => 'Noun not found'], 404);
        }

        $is_correct = $noun->gender === $selected_gender;

        return response()->json(['is_correct' => $is_correct]);
    }

    public function updateScores(Request $request)
    {
        $game_session_id = $request->input('game_session_id');
        $player_id = $request->input('player_id');
        $score_change = $request->input('score_change');

        $game_round = GameRound::where('game_session_id', $game_session_id)
            ->where(function ($query) use ($player_id) {
                $query->where('player1_id', $player_id)
                    ->orWhere('player2_id', $player_id);
            })
            ->first();

        if (!$game_round) {
            return response()->json(['error' => 'Game round not found'], 404);
        }

        if ($game_round->player1_id === $player_id) {
            $game_round->player1_score += $score_change;
        } else {
            $game_round->player2_score += $score_change;
        }

        $game_round->save();

        return response()->json(['success' => true, 'updated_score' => $score_change]);
    }
}

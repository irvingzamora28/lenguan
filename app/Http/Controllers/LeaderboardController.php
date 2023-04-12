<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboards = Leaderboard::all();
        return response()->json($leaderboards);
    }

    public function show(Leaderboard $leaderboard)
    {
        return response()->json($leaderboard);
    }
}

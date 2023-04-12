<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
use App\Http\Controllers\AuthController;

// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// Player routes
Route::post('register', [PlayerController::class, 'register']);
Route::post('login', [PlayerController::class, 'login']);
Route::apiResource('players', PlayerController::class)->middleware('auth:api');

// Language routes
Route::apiResource('languages', LanguageController::class);

// Noun routes
Route::apiResource('nouns', NounController::class);

// GameSession routes
Route::apiResource('game_sessions', GameSessionController::class);

// GameRound routes
Route::apiResource('game_rounds', GameController::class);

// Leaderboard routes
Route::apiResource('leaderboards', LeaderboardController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

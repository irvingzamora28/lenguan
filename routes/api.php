<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NounController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\GameSessionController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\GameController;

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

Route::get('fetch-nouns', [GameController::class, 'fetchNouns']);
Route::post('submit-answer', [GameController::class, 'submitAnswer']);
Route::put('update-scores', [GameController::class, 'updateScores']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['prefix' => 'nouns'], function () {
    Route::get('/', [NounController::class, 'index']);
    Route::get('/{noun}', [NounController::class, 'show']);
});

Route::group(['prefix' => 'players'], function () {
    Route::post('/register', [PlayerController::class, 'register']);
    Route::post('/login', [PlayerController::class, 'login']);
    Route::get('/', [PlayerController::class, 'index']);
    Route::get('/{player}', [PlayerController::class, 'show']);
});

Route::group(['prefix' => 'game-sessions'], function () {
    Route::get('/', [GameSessionController::class, 'index']);
    Route::post('/', [GameSessionController::class, 'store']);
    Route::get('/{gameSession}', [GameSessionController::class, 'show']);
});

Route::group(['prefix' => 'leaderboards'], function () {
    Route::get('/', [LeaderboardController::class, 'index']);
    Route::get('/{leaderboard}', [LeaderboardController::class, 'show']);
});

Route::group(['prefix' => 'languages'], function () {
    Route::get('/', [LanguageController::class, 'index']);
    Route::get('/{language}', [LanguageController::class, 'show']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

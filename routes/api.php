<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NounController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\GameSessionController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LessonController;

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
use App\Http\Controllers\CourseController;
use App\Http\Controllers\FormSubmitController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\TextToSpeechController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VocabularyExerciseController;

Route::get('fetch-nouns', [GameController::class, 'fetchNouns']);
Route::post('submit-answer', [GameController::class, 'submitAnswer']);
Route::put('update-scores', [GameController::class, 'updateScores']);

Route::group(['middleware' => ['csrf']], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    //     Route::post('/data', function (Request $request) {
    //         return "Hello world";
    //     });
});



Route::post('/data', function () {
    // Handle request
    return "Hello world";
})->middleware('csrf');

Route::group(['prefix' => 'courses'], function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::get('/{course_id}/levels', [CourseController::class, 'levels']);
    Route::get('/{course_id}/lessons', [CourseController::class, 'lessons']);
});

Route::group(['prefix' => 'goals'], function () {
    Route::get('/', [GoalController::class, 'index']);
    Route::get('/{language_id}', [GoalController::class, 'goalsByLanguage']);
});

Route::group(['prefix' => 'nouns'], function () {
    Route::get('/', [NounController::class, 'index']);
    Route::get('/gender-duel', [NounController::class, 'genderDuelWords']);
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
    Route::get('/{language}/courses', [LanguageController::class, 'courses']);
    Route::get('/{language}', [LanguageController::class, 'show']);
});

Route::group(['prefix' => 'vocabulary-exercises'], function () {
    Route::get('/{lessonNumber}', [VocabularyExerciseController::class, 'getByLessonNumber']);
});

Route::group(['prefix' => 'text-to-speech'], function () {
    Route::post('/', [TextToSpeechController::class, 'convertTextToSpeech']);
    Route::get('/voices', [TextToSpeechController::class, 'retrieveVoices']);
});

Route::group(['prefix' => 'form'], function () {
    Route::post('/contact', [FormSubmitController::class, 'contactForm'])->middleware('throttle:contact-form-submission');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('/user', [UserController::class, 'update']);
    Route::put('/user/language', [UserController::class, 'updateTargetLanguage']);
    Route::put('/user/course', [UserController::class, 'updateTargetCourse']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

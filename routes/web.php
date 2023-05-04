<?php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Models\Goal;
use App\Models\Language;
use App\Models\Lesson;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show'])->name('sanctum.csrf-cookie');
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Email verified successfully.']);
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Verification link resent.']);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

Route::get('/', function () {

    $language = Language::where('name', 'German')->first();
    dd($language->courses);

    // Fetch the "Travel" goal
    $travelGoal = Goal::where('name', 'Travel')->first();
    // dd($travelGoal->id);
    // Check if the goal exists
    if ($travelGoal) {
        // Fetch all lessons related to the "Travel" goal
        $travelLessons = Lesson::whereIn('goal_ids', [$travelGoal->id])->get();
        // dd($travelLessons);
        // Display the lessons (or process them as needed)
        foreach ($travelLessons as $lesson) {
            echo $lesson->name . "\n <br/>";
        }
    } else {
        echo "Travel goal not found.\n <br/>";
    }

    return view('welcome');
});

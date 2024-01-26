<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonExerciseRequest;

class ExerciseController extends Controller
{

    public function exercises(LessonExerciseRequest $request)
    {
        $lesson = $request->get("lesson");
        $exercisesData = $lesson->exercises->map(function ($exercise) {
            $exerciseDetails = $exercise->exerciseable->toArray();
            $exerciseType = class_basename($exercise->exerciseable_type);

            return [
                'type' => $exerciseType,
                'details' => $exerciseDetails
            ];
        });

        // Extract unique types from the exercises data
        $exerciseTypes = $exercisesData->pluck('type')->unique();

        return response()->json([
            'exercise_types' => $exerciseTypes,
            'lesson' => $lesson,
            'exercises' => $exercisesData,
        ]);
    }
}

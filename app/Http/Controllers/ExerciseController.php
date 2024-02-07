<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Requests\LessonExerciseRequest;
use Illuminate\Support\Collection;

class ExerciseController extends Controller
{

    /**
     * Get exercises for a lesson.
     *
     * @param LessonExerciseRequest $request
     * @return JsonResponse
     */
    public function exercises(LessonExerciseRequest $request): JsonResponse
    {
        $lesson = $request->get('lesson');

        $mappedExercises = $this->mapExercises($lesson->exercises);

        return response()->json([
            'exercise_types' => $mappedExercises->pluck('type')->unique()->values(),
            'lesson' => $lesson,
            'exercises' => $mappedExercises
        ]);
    }

    /**
     * Map collection of exercises to array of formatted exercise data.
     *
     * @param Collection $exercises
     * @return Collection
     */
    protected function mapExercises(Collection $exercises)
    {
        return $exercises->map(function ($exercise) {
            $exerciseDetails = $exercise->exerciseable->toArray();
            unset($exerciseDetails['created_at'], $exerciseDetails['updated_at'], $exerciseDetails['_id']);

            $exerciseType = class_basename($exercise->exerciseable_type);

            return [
                'type' => $exerciseType,
                'details' => $exerciseDetails
            ];
        });
    }
}

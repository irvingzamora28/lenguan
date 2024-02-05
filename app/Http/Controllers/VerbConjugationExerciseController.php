<?php

namespace App\Http\Controllers;

use App\Exceptions\CourseNotFoundException;
use App\Exceptions\InvalidAPIParameterException;
use App\Exceptions\LessonNotFoundException;
use App\Http\Resources\VerbConjugationExerciseResource;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\VerbConjugationExercise;
use Illuminate\Http\Request;

class VerbConjugationExerciseController extends Controller
{
    /**
     * Get verb conjugation exercises by lesson number.
     *
     * @param int $lessonNumber The lesson number.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection The collection of verb conjugation exercises.
     * @throws InvalidAPIParameterException If the lesson number is invalid.
     * @throws CourseNotFoundException If the course is not found.
     * @throws LessonNotFoundException If the lesson is not found.
     */
    public function getByLessonNumber(Request $request)
    {
        $lessonNumber = $request->get('lesson_number');
        $courseId = $request->get('course_id');
        if (!is_numeric($lessonNumber)) {
            throw new InvalidAPIParameterException("Invalid lesson verb conjugation exercise");
        }

        if (!$courseId) {
            throw new CourseNotFoundException();
        }

        $lessonId = Lesson::where('course_id', $courseId)
            ->where('lesson_number', (int)$lessonNumber)
            ->value('id');

        if (!$lessonId) {
            throw new LessonNotFoundException;
        }
        $verbConjugationExercises = VerbConjugationExercise::where('lesson_id', $lessonId)
            ->select('verb', 'tenses', 'pronouns', 'conjugations', 'lesson_id')
            ->get();
        return VerbConjugationExerciseResource::collection($verbConjugationExercises);
    }
}

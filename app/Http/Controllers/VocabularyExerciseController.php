<?php

namespace App\Http\Controllers;

use App\Exceptions\CourseNotFoundException;
use App\Exceptions\InvalidAPIParameterException;
use App\Exceptions\LessonNotFoundException;
use App\Http\Resources\VocabularyExerciseResource;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\VocabularyExercise;
use Illuminate\Http\Request;

/**
 * Class VocabularyExerciseController
 * 
 * This class is responsible for handling vocabulary exercise related requests.
 */
class VocabularyExerciseController extends Controller
{
    /**
     * Get vocabulary exercises by lesson number.
     *
     * @param int $lessonNumber The lesson number.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection The collection of vocabulary exercises.
     * @throws InvalidAPIParameterException If the lesson number is invalid.
     * @throws CourseNotFoundException If the course is not found.
     * @throws LessonNotFoundException If the lesson is not found.
     */
    public function getByLessonNumber($lessonNumber)
    {
        if (!is_numeric($lessonNumber)) {
            throw new InvalidAPIParameterException("Invalid vocabulary exercise");
        }

        $courseId = Course::where('name', 'German for Beginners')->value('id');

        if (!$courseId) {
            throw new CourseNotFoundException();
        }

        $lessonId = Lesson::where('course_id', $courseId)
            ->where('lesson_number', (int)$lessonNumber)
            ->value('id');

        if (!$lessonId) {
            throw new LessonNotFoundException;
        }

        $vocabularyExercises = VocabularyExercise::where('lesson_id', $lessonId)
            ->select('prompt', 'answer')
            ->get();
        return VocabularyExerciseResource::collection($vocabularyExercises);
    }
}

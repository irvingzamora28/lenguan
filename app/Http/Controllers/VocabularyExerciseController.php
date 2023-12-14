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

class VocabularyExerciseController extends Controller
{
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

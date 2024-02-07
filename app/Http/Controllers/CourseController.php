<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        // Bring all courses but include language model
        $courses = Course::with('language')->get();
        return response()->json($courses);
    }

    public function levels($course_id)
    {
        $course = Course::with('levels')->findOrFail($course_id);

        return response()->json($course);
    }

    public function lessons($course_id)
    {
        $course = Course::with([
            'levels.lessons' => function ($query) {
                $query->with('goals')
                    ->with(['exercises' => function ($query) {
                        $query->select(['exerciseable_type', 'lesson_id']);
                    }])
                    ->where('is_active', true)
                    ->select('_id', 'name', 'description', 'lesson_number', 'level_id');
            }
        ])->findOrFail($course_id);

        $lessons = $course->levels->flatMap(function ($level) use ($course) {
            return $level->lessons->map(function ($lesson) use ($level, $course) {
                $lesson->level_name = $level->name;
                return [
                    // Output course data, id, name and description
                    '_id' => $lesson->_id,
                    'course_id' => $course->_id,
                    'name' => $lesson->name,
                    'description' => $lesson->description,
                    'level_id' => $lesson->level_id,
                    'level_name' => $lesson->level_name,
                    'lesson_number' => $lesson->lesson_number,
                    'goal_ids' => $lesson->goal_ids,
                    'exercise_types' => $lesson->exercises->map(function ($exercise) {
                        return [
                            'exerciseable_type' => class_basename($exercise->exerciseable_type),
                        ];
                    })->pluck('exerciseable_type')->unique()->values(),
                    'goals' => $lesson->goals->map(function ($goal) {
                        return [
                            '_id' => $goal->_id,
                            'name' => $goal->name
                        ];
                    })->toArray()
                ];
            });
        })->values();

        return response()->json($lessons);
    }
}

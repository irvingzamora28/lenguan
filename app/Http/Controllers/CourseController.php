<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        return response()->json($courses);
    }

    public function levels($course_id)
    {
        $course = Course::with('levels')->findOrFail($course_id);

        return response()->json($course);
    }

    public function lessons($course_id)
    {
        $course = Course::with('levels.lessons.goals')->findOrFail($course_id);

        $lessons = collect([]);
        foreach ($course->levels as $level) {
            foreach ($level->lessons as $lesson) {
                $lesson->level_name = $level->name;
                $lesson->progress = 0;
                $lessons->push($lesson);
            }
        }

        return response()->json($lessons);
    }
}

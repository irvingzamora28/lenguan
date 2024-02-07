<?php

namespace Tests\Feature\Http\Controllers;

use App\Exceptions\CourseNotFoundException;
use App\Exceptions\LessonNotFoundException;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\VocabularyExercise;
use Tests\TestCase;

class VocabularyExerciseControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Clear database between tests
        Course::truncate();
        Lesson::truncate();
        VocabularyExercise::truncate();
    }

    public function testGetByLessonNumberWithValidLessonNumber()
    {
        $course = Course::factory()->create(['name' => 'German for Beginners']);
        $lesson = Lesson::factory()->create(['course_id' => $course->id]);
        $exercises = VocabularyExercise::factory()->count(3)->create(['lesson_id' => $lesson->id]);

        $response = $this->get('/api/vocabulary-exercises/?' . http_build_query(['course_id' => $course->id, 'lesson_number' => $lesson->lesson_number]));
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'prompt',
                    'answer',
                    'options',
                ],
            ],
        ]);
    }

    public function testGetByLessonNumberWithInvalidLessonNumber()
    {
        $response = $this->get('/api/vocabulary-exercises/?' . http_build_query(['course_id' => "1", 'lesson_number' => 'invalid']));

        $response->assertStatus(400);

        $response->assertJson([
            'message' => 'Invalid lesson vocabulary exercise',
        ]);
    }


    public function testGetByLessonNumberWithNonExistingCourse()
    {
        $exception = new CourseNotFoundException();

        $response = $this->get('/api/vocabulary-exercises/?' . http_build_query(['lesson_number' => 1]));

        $response->assertStatus($exception->getCode());

        $response->assertJson([
            'message' => $exception->getMessage(),
        ]);
    }

    public function testGetByLessonNumberWithNonExistingLesson()
    {
        $course = Course::factory()->create(['name' => 'German for Beginners']);

        $exception = new LessonNotFoundException();

        $response = $this->get('/api/vocabulary-exercises/?' . http_build_query(['course_id' => $course->id, 'lesson_number' => "100"]));

        $response->assertStatus($exception->getCode());

        $response->assertJson([
            'message' => $exception->getMessage(),
        ]);
    }
}

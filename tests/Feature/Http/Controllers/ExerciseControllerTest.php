<?php

namespace Tests\Feature\Http\Controllers;

use Tests\TestCase;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Exercise;
use App\Models\GrammarExercise;

class ExerciseControllerTest extends TestCase
{

    private $course;
    /**
     * Set up environment for testing.
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Clear database between tests
        Course::truncate();
        Lesson::truncate();
        GrammarExercise::truncate();

        // Seed the database with a course
        $this->course = Course::factory()->create([
            'name' => 'Test Course',
            'description' => 'This is a test course.'
        ]);

        // Seed the database with a lesson associated with the course
        $lesson = Lesson::factory()->create([
            'name' => 'Test Lesson',
            'description' => 'This is a test lesson.',
            'course_id' => $this->course->id,
            'lesson_number' => 1
        ]);

        // Seed the database with a grammar exercise associated with the lesson
        $grammarExercise = GrammarExercise::factory()->create([
            'prompt' => 'What is the correct answer?',
            'options' => ['Option 1', 'Option 2', 'Option 3'],
            'answer' => 'Option 1',
            'lesson_id' => $lesson->id
        ]);

        // Seed the database with an exercise record for the grammar exercise
        Exercise::factory()->create([
            'exerciseable_id' => $grammarExercise->id,
            'exerciseable_type' => GrammarExercise::class,
            'lesson_id' => $lesson->id
        ]);
    }


    /**
     * Test retrieving exercises with a valid request.
     */
    public function testExercisesWithValidRequest()
    {
        $response = $this->json('GET', '/api/exercises/all', ['course_id' => $this->course->id, 'lesson_number' => 1]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'exercise_types',
                'lesson' => [
                    '_id', 'name', 'description', 'course_id'
                ],
                'exercises' => [
                    '*' => [
                        'type', 'details'
                    ]
                ]
            ]);
    }

    /**
     * Test retrieving exercises with an invalid request.
     */
    public function testExercisesWithInvalidRequest()
    {
        $response = $this->json('GET', '/api/exercises/all', ['course_id' => 'invalid-course-id']);

        $response
            ->assertStatus(422)
            ->assertJsonStructure(['errors']);
    }

    /**
     * Test the mapping of exercises in the response.
     */
    public function testExerciseMapping()
    {
        // Create a lesson with a grammar exercise
        $course = Course::create(['name' => 'Sample Course', 'description' => 'Sample Description']);
        $lesson = Lesson::create(['name' => 'Sample Lesson', 'lesson_number' => 1, 'description' => 'Sample Description', 'course_id' => $course->id]);
        $grammarExercise = GrammarExercise::create(['prompt' => 'Sample Prompt', 'options' => ['A', 'B', 'C'], 'answer' => 'A', 'lesson_id' => $lesson->id]);
        Exercise::create(['exerciseable_id' => $grammarExercise->id, 'exerciseable_type' => GrammarExercise::class, 'lesson_id' => $lesson->id]);

        $response = $this->json('GET', '/api/exercises/all', ['course_id' => $course->id, 'lesson_number' => $lesson->lesson_number]);

        $response
            ->assertStatus(200)
            ->assertJsonFragment([
                'type' => 'GrammarExercise',
                'details' => [
                    'answer' => 'A',
                    'lesson_id' => $lesson->id,
                    'options' => ['A', 'B', 'C'],
                    'prompt' => 'Sample Prompt',
                ]
            ]);
    }
}

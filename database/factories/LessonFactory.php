<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * LessonFactory class.
 *
 * This factory is responsible for generating fake data for the Lesson model.
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Lesson>
 */
class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    /**
     * Generate a fake definition for a Lesson model.
     *
     * @return array The generated fake data for the Lesson model.
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'lesson_number' => $this->faker->numberBetween(1, 10),
            'course_id' => Course::factory(),
        ];
    }
}

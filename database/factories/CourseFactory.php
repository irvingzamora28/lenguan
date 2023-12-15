<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * CourseFactory class.
 *
 * This class is responsible for generating fake data for the Course model.
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    /**
     * Generate a fake definition for the Course model.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'image' => $this->faker->imageUrl,
            'language_id' => $this->faker->uuid,
        ];
    }
}

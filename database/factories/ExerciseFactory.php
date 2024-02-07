<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exercise>
 */
class ExerciseFactory extends Factory
{
    protected $model = Exercise::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'exerciseable_id' => $this->faker->uuid,
            'exerciseable_type' => $this->faker->randomElement(['App\Models\GrammarExercise', 'App\Models\TranslationExercise', 'App\Models\VocabularyExercise']),
            'lesson_id' => Lesson::factory(),
        ];
    }
}

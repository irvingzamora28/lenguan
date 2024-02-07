<?php

namespace Database\Factories;

use App\Models\GrammarExercise;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GrammarExercise>
 */
class GrammarExerciseFactory extends Factory
{
    protected $model = GrammarExercise::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prompt' => $this->faker->word,
            'options' => $this->faker->words(4),
            'answer' => $this->faker->word,
            'lesson_id' => Lesson::factory(),
        ];
    }
}

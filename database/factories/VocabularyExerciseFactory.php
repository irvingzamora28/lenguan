<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\VocabularyExercise;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Class VocabularyExerciseFactory
 *
 * This class is responsible for generating fake data for the VocabularyExercise model.
 * 
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<VocabularyExercise>
 */
class VocabularyExerciseFactory extends Factory
{
    protected $model = VocabularyExercise::class;

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

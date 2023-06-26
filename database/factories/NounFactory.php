<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Noun>
 */
class NounFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'word' => $this->faker->word,
            'gender' => $this->faker->randomElement(['der', 'die', 'das']),
            'difficulty_level' => 1,
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\VocabularyExercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class VocabularyExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $course = Course::where('name', 'German for Beginners')->first();

        if ($course) {
            for ($i = 1; $i <= 100; $i++) {
                $lesson = $course->lessons()->where('lesson_number', $i)->first();

                $mdxFilePath = base_path("frontend/src/lessons/german/lesson{$i}.mdx");

                if (!file_exists($mdxFilePath)) {
                    continue;
                }

                // Parse the .mdx file
                $mdxContent = file_get_contents($mdxFilePath);
                $parsedMdx = YamlFrontMatter::parse($mdxContent);

                foreach ($parsedMdx->matter('vocabulary') as $vocabulary) {
                    VocabularyExercise::create([
                        'prompt' => $vocabulary['word'],
                        'answer' => $vocabulary['translation'],
                        'lesson_id' => $lesson->id,
                    ]);
                }
            }
        }
    }
}

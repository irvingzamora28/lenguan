<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Exercise;
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
        $this->processCourse('German for Beginners', 'german', 'en');
        $this->processCourse('Spanish for Everyone', 'spanish', 'en');
        $this->processCourse('Inglés para todos', 'english', 'es');
    }

    private function processCourse($courseName, $language, $lessonLanguage)
    {
        $course = Course::where('name', $courseName)->first();

        if (!$course) {
            return;
        }

        for ($i = 1; $i <= 100; $i++) {
            $lesson = $course->lessons()->where('lesson_number', $i)->first();

            $mdxFilePath = base_path("frontend/src/lessons/{$language}/{$lessonLanguage}/lesson{$i}.mdx");

            if (!file_exists($mdxFilePath)) {
                continue;
            }

            // Parse the .mdx file
            $mdxContent = file_get_contents($mdxFilePath);
            $parsedMdx = YamlFrontMatter::parse($mdxContent);

            foreach ($parsedMdx->matter('vocabulary') as $vocabulary) {
                if (array_key_exists('word', $vocabulary) && array_key_exists('translation', $vocabulary)) {
                    // Remove content inside parentheses, special characters, and ellipsis
                    $cleanWord = preg_replace('/\(.*?\)|[!@#\$%\^&\*\/\(\)]|\.{3}/', '', $vocabulary['word']);
                    $cleanTranslation = preg_replace('/\(.*?\)|[!@#\$%\^&\*\(\)]|\.{3}/', '', $vocabulary['translation']);

                    $vocabularyExercise = VocabularyExercise::create([
                        'prompt' => $cleanWord,
                        'answer' => $cleanTranslation,
                    ]);
                    $exerciseForVocabulary = Exercise::create([
                        'exerciseable_id' => $vocabularyExercise->id,
                        'exerciseable_type' => get_class($vocabularyExercise),
                        'lesson_id' => $lesson->id
                    ]);
                }
            }
        }
    }
}

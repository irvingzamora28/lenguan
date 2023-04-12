<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Language;
use App\Models\Noun;
use App\Models\Translation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NounSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    $nouns = json_decode(file_get_contents(database_path('seeds/nouns_seed.json')), true);
    $language = Language::where('name', 'German')->firstOrFail();

    foreach ($nouns as $noun) {
        $translation = new Translation([
            'language_id' => $language->id,
            'translation' => $noun['translation']
        ]);
        $translation->save();

        $category = Category::where('name', $noun['category'])->firstOrFail();

        $newNoun = new Noun();
        $newNoun->word = $noun['word'];
        $newNoun->gender = $noun['gender'];
        $newNoun->difficulty_level = $noun['difficulty_level'];
        $newNoun->language()->associate($language);
        $newNoun->translation()->associate($translation);
        $newNoun->save();

        $categoryId = $category->id;
        $newNoun->categories()->attach($categoryId);
    }
}

}

<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Language;
use App\Models\Noun;
use App\Models\NounTranslation;
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
    $languageTranslation = Language::where('name', 'English')->firstOrFail();

    foreach ($nouns as $noun) {

        $category = Category::where('name', $noun['category'])->firstOrFail();

        $newNoun = new Noun();
        $newNoun->word = $noun['word'];
        $newNoun->gender = $noun['gender'];
        $newNoun->difficulty_level = $noun['difficulty_level'];
        $newNoun->language()->associate($language);
        $newNoun->save();

        $newNoun->categories()->attach($category->id);

        // Associate english translation
        NounTranslation::create([
            'language_id' => $languageTranslation->id,
            'translation' => $noun['translation'],
            'noun_id' => $newNoun->id
        ]);
    }
}

}

<?php

namespace App\Services;

use App\Models\Language;
use App\Models\Noun;
use App\Models\NounTranslation;
use Illuminate\Database\Eloquent\Collection;
use Jenssegers\Mongodb\Collection as MongoDBCollection;

class NounService implements NounServiceInterface
{
    public function getAllNouns(): Collection
    {
        return Noun::all();
    }


    public function getGenderDuelWords(int $quantity, int $difficultyLevel): Collection
    {
        // TODO: Get the user's language
        $languageTranslation = Language::where('name', 'English')->firstOrFail();

        $nouns = Noun::raw(function (MongoDBCollection $collection) use ($quantity, $difficultyLevel) {
            return $collection->aggregate([
                ['$match' => ['difficulty_level' => $difficultyLevel]],
                ['$sample' => ['size' => $quantity]],
            ]);
        });

        $nouns->each(function ($noun) use ($languageTranslation) {
            $translation = NounTranslation::where('noun_id', $noun->_id)
                ->where('language_id', $languageTranslation->id)
                ->first();

            $noun->translation = $translation ? $translation->translation : null;
        });

        return $nouns;
    }

    public function getNounById(string $id)
    {
        return Noun::find($id);
    }
}

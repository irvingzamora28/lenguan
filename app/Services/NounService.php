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


    public function getGenderDuelWords(int $quantity, string $languageId, int $difficultyLevel = 1): Collection
    {
        // This will throw a ModelNotFoundException if the language does not exist
        Language::findOrFail($languageId);

        $nouns = Noun::raw(function (MongoDBCollection $collection) use ($quantity, $languageId, $difficultyLevel) {
            return $collection->aggregate([
                ['$match' => ['language_id' => $languageId, 'difficulty_level' => $difficultyLevel]],
                ['$sample' => ['size' => $quantity]],
            ]);
        });

        $nouns->each(function ($noun) use ($languageId) {
            $translation = NounTranslation::where('noun_id', $noun->_id)
                ->where('language_id', $languageId)
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
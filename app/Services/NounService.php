<?php

namespace App\Services;

use App\Models\Noun;
use Illuminate\Support\Collection;

class NounService implements NounServiceInterface
{
    public function getAllNouns() : Collection
    {
        return Noun::all();
    }

    public function getGenderDuelWords(int $quantity) : Collection
    {
        return Noun::raw(function ($collection) use ($quantity) {
            return $collection->aggregate([
                ['$match' => ['difficulty_level' => 1]],
                ['$sample' => ['size' => $quantity]],
            ]);
        });
    }

    public function getNounById(string $id)
    {
        return Noun::find($id);
    }
}

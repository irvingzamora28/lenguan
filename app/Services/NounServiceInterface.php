<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;

interface NounServiceInterface
{
    public function getAllNouns() : Collection;
    public function getGenderDuelWords(int $quantity, int $difficultyLevel): Collection;
    public function getNounById(string $id);
}

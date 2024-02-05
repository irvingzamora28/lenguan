<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VerbConjugationExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'verb' => $this->verb,
            'tenses' => $this->tenses,
            'pronouns' => $this->pronouns,
            'conjugations' => $this->conjugations,
            'lesson_id' => $this->lesson_id
        ];
    }
}

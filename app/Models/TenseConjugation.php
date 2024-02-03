<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class TenseConjugation extends Model
{
    use HasFactory;
    protected $collection = 'tense_conjugations';
    protected $fillable = ['tense', 'conjugations'];

    public function verbConjugationExercises(): BelongsToMany
    {
        return $this->belongsToMany(VerbConjugationExercise::class, 'tense_conjugation_verb_conjugation_exercise', 'tense_conjugation_id', 'verb_conjugation_exercise_id');
    }
}

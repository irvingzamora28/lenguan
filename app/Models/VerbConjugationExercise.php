<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class VerbConjugationExercise extends Model
{
    use HasFactory;

    protected $collection = 'verb_conjugation_exercises';
    protected $fillable = ['verb', 'tenses', 'pronouns', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercise()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

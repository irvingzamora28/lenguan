<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class VocabularyExercise extends Model
{
    use HasFactory;

    protected $collection = 'vocabulary_exercises';
    protected $fillable = ['prompt', 'options', 'answer', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercise()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

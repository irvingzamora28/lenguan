<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class VocabularyExercise extends Model
{
    protected $collection = 'vocabulary_exercises';
    protected $fillable = ['prompt', 'options', 'answer', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class TranslationExercise extends Model
{
    use HasFactory;

    protected $collection = 'translation_exercises';

    protected $fillable = ['prompt', 'translation', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercise()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

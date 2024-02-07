<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class PronunciationExercise extends Model
{
    use HasFactory;

    protected $collection = 'pronunciation_exercises';
    protected $fillable = ['text', 'audio', 'transcript', 'answer', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercise()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

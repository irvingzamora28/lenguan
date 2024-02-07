<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class ListeningExercise extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'listening_exercises';

    protected $fillable = [
        'audio_url', 'transcript', 'prompt', 'options', 'answer', 'lesson_id',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercise()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

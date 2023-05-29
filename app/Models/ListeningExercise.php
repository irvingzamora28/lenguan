<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

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
}

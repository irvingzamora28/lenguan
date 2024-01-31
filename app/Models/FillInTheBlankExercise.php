<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class FillInTheBlankExercise extends Model
{
    use HasFactory;

    protected $collection = 'fill_in_the_blank_exercises';

    protected $fillable = ['prompt', 'options', 'answer', 'hint', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exercises()
    {
        return $this->morphOne(Exercise::class, 'exerciseable');
    }
}

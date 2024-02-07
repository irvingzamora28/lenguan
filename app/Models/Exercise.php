<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'exercises';


    protected $fillable = [
        'exerciseable_id', 'exerciseable_type', 'lesson_id'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function exerciseable()
    {
        return $this->morphTo();
    }
}

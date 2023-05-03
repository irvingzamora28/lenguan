<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'lessons';

    protected $fillable = [
        'name', 'description', 'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }
}

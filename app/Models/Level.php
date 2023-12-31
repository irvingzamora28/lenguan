<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'levels';

    protected $fillable = [
        'name',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
}

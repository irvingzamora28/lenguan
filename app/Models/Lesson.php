<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

class Lesson extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'lessons';

    protected $fillable = [
        'name', 'description', 'course_id',
    ];

    public function goals(): BelongsToMany
    {
        return $this->belongsToMany(Goal::class, null, 'lesson_ids', 'goal_ids');
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

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

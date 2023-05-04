<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsToMany;

class Goal extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'goals';

    protected $fillable = ['name'];

    public function lessons(): BelongsToMany
    {
        return $this->belongsToMany(Lesson::class, null, 'goal_ids', 'lesson_ids');
    }
}

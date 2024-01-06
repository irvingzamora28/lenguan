<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\BelongsToMany;

class Goal extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'goals';

    protected $fillable = ['name', 'language_id'];

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'language_id', '_id');
    }

    public function lessons(): BelongsToMany
    {
        return $this->belongsToMany(Lesson::class, null, 'goal_ids', 'lesson_ids');
    }
}

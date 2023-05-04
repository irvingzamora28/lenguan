<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'courses';

    protected $fillable = [
        'name', 'description', 'image', 'language_id',
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class, null, 'course_ids', 'level_ids');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Noun extends Model
{
    use HasFactory;

    protected $fillable = ['word', 'gender', 'language_id', 'difficulty_level', 'translation_id'];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function translation()
    {
        return $this->belongsTo(Translation::class);
    }

    public function gameRounds()
    {
        return $this->hasMany(GameRound::class);
    }

    public function gameSessions()
    {
        return $this->hasMany(GameSession::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'noun_category', 'noun_id', 'category_id');
    }
}

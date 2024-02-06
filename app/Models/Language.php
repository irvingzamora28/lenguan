<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\BelongsToMany;
use MongoDB\Laravel\Relations\HasMany;

class Language extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'languages';

    protected $fillable = ['name', 'code', 'special_characters'];

    public function nouns()
    {
        return $this->hasMany(Noun::class);
    }

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class, 'language_id', '_id');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'language_id', '_id');
    }

    public function nounTranslations()
    {
        return $this->hasMany(NounTranslation::class);
    }

    public function gameSessions()
    {
        return $this->hasMany(GameSession::class);
    }

    public function highScores()
    {
        return $this->hasMany(HighScore::class);
    }

    public function leaderboards()
    {
        return $this->hasMany(Leaderboard::class);
    }
}

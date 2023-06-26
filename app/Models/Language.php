<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Relations\BelongsTo;
use Jenssegers\Mongodb\Relations\BelongsToMany;
use Jenssegers\Mongodb\Relations\HasMany;

class Language extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'languages';

    protected $fillable = ['name'];

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

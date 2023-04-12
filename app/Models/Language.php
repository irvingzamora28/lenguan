<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function nouns()
    {
        return $this->hasMany(Noun::class);
    }

    public function translations()
    {
        return $this->hasMany(Translation::class);
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

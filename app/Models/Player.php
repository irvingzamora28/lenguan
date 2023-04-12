<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Player extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['username', 'email', 'password'];

    protected $hidden = ['password'];

    public function gameSessions1()
    {
        return $this->hasMany(GameSession::class, 'player1_id');
    }

    public function gameSessions2()
    {
        return $this->hasMany(GameSession::class, 'player2_id');
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

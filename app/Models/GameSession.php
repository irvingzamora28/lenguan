<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    use HasFactory;

    protected $fillable = ['player1_id', 'player2_id', 'mode', 'language_id', 'difficulty_level'];

    public function player1()
    {
        return $this->belongsTo(Player::class, 'player1_id');
    }

    public function player2()
    {
        return $this->belongsTo(Player::class, 'player2_id');
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function gameRounds()
    {
        return $this->hasMany(GameRound::class);
    }
}

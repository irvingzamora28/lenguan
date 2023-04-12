<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class GameRound extends Model
{
    use HasFactory;

    protected $fillable = ['game_session_id', 'noun_id', 'player1_score', 'player2_score'];

    public function gameSession()
    {
        return $this->belongsTo(GameSession::class);
    }

    public function noun()
    {
        return $this->belongsTo(Noun::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class GameRoom extends Model
{
    use HasFactory;

    protected $collection = 'game_rooms';
    protected $fillable = [
        'room_code',
        'players',
        'game_state',
        'max_players',
    ];
}

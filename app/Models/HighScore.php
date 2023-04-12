<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class HighScore extends Model
{
    use HasFactory;

    protected $fillable = ['player_id', 'score', 'language_id', 'difficulty_level'];

    public function player()
    {
        return $this->belongsTo(Player::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}

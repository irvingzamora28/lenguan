<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Translation extends Model
{
    use HasFactory;

    protected $fillable = ['language_id', 'translation', 'translation_noun_id'];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function noun()
    {
        return $this->hasOne(Noun::class, 'translation_id');
    }
}

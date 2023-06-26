<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class NounTranslation extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';

    protected $collection = 'noun_translations';

    protected $fillable = ['language_id', 'translation', 'noun_id'];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function noun()
    {
        return $this->belongsTo(Noun::class);
    }
}

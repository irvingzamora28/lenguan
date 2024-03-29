<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;
    protected $fillable = ['data'];

    protected $casts = [
        'data' => 'array',
    ];
}

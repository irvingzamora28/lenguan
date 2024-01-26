<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsToMany;

class Lesson extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'lessons';

    protected $fillable = [
        'name', 'description', 'course_id', 'lesson_number'
    ];

    public function goals(): BelongsToMany
    {
        return $this->belongsToMany(Goal::class, null, 'lesson_ids', 'goal_ids');
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function listeningExercises()
    {
        return $this->hasMany(ListeningExercise::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }

    // TODO: Create Quiz model and add relationship for quizzes
    // public function quizzes()
    // {
    //     return $this->hasMany(Quiz::class);
    // }

    public function vocabularyExercises()
    {
        return $this->hasMany(VocabularyExercise::class);
    }

    public function grammarExercises()
    {
        return $this->hasMany(GrammarExercise::class);
    }

    public function pronunciationExercises()
    {
        return $this->hasMany(PronunciationExercise::class);
    }
    public function translationExercises()
    {
        return $this->hasMany(TranslationExercise::class);
    }
}

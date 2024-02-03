<?php

use Illuminate\Database\Migrations\Migration;
use MongoDB\Laravel\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tense_conjugation_verb_conjugation_exercise', function (Blueprint $collection) {
            $collection->id();
            $collection->foreignId('tense_conjugation_id')->constrained('tense_conjugations');
            $collection->foreignId('verb_conjugation_exercise_id')->constrained('verb_conjugation_exercises');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tense_conjugation_verb_conjugation_exercise');
    }
};

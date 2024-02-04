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
        Schema::create('verb_conjugation_exercises', function (Blueprint $collection) {
            $collection->id();
            $collection->string('verb');
            $collection->array('pronouns');
            $collection->array('tenses');
            $collection->embedsMany('conjugations'); // Embed conjugations directly
            $collection->foreignId('lesson_id')->constrained('lessons');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verb_conjugation_exercises');
    }
};

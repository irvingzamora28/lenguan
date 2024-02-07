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
        Schema::create('fill_in_the_blank_exercises', function (Blueprint $collection) {
            $collection->id();
            $collection->array('options');
            $collection->string('prompt');
            $collection->string('answer');
            $collection->string('hint');
            $collection->foreignId('lesson_id')->constrained('lessons');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fill_in_the_blank_exercises');
    }
};

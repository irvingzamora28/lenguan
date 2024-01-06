<?php

use Illuminate\Database\Migrations\Migration;
use MongoDB\Laravel\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pronunciation_exercises', function (Blueprint $collection) {
            $collection->id();
            $collection->string('text');
            $collection->string('audio');
            $collection->string('transcript');
            $collection->string('prompt');
            $collection->string('answer');
            $collection->foreignId('lesson_id')->constrained('lessons');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pronunciation_exercises');
    }
};

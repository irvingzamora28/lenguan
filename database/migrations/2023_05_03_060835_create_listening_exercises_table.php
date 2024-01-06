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
        Schema::create('listening_exercises', function (Blueprint $collection) {
            $collection->id();
            $collection->string('audio_url');
            $collection->string('transcript');
            $collection->array('options');
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
        Schema::dropIfExists('listening_exercises');
    }
};

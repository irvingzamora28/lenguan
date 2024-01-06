<?php

use Illuminate\Database\Migrations\Migration;
use MongoDB\Laravel\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vocabulary_exercises', function (Blueprint $collection) {
            $collection->id();
            $collection->string('prompt');
            $collection->array('options');
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
        Schema::dropIfExists('vocabulary_exercises');
    }
};

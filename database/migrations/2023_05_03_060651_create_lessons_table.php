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
        Schema::create('lessons', function (Blueprint $collection) {
            $collection->id();
            $collection->string('name');
            $collection->string('description');
            $collection->smallInteger("lesson_number", false, true);
            $collection->foreignId('course_id')->constrained('courses');
            $collection->string('content');
            $collection->array('exercises');
            $collection->array('quizzes');
            $collection->boolean('is_active');
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
        Schema::dropIfExists('lessons');
    }
};

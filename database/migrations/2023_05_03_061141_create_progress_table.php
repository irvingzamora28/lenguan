<?php

use Illuminate\Database\Migrations\Migration;
use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('progress', function (Blueprint $collection) {
            $collection->id();
            $collection->foreignId('lesson_id')->constrained('lessons');
            $collection->integer('score');
            $collection->timestamp('timestamp');
            $collection->foreignId('language_id')->constrained('languages');
            $collection->foreignId('user_id')->constrained('users');
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
        Schema::dropIfExists('progress');
    }
};

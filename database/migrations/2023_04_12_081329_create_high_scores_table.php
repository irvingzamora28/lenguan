<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('high_scores', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreign('player_id')->references('_id')->on('players');
            $collection->integer('score')->comment("the player's high score");
            $collection->foreign('language_id')->references('_id')->on('languages');
            $collection->integer('difficulty_level')->comment('the difficulty level of the high score');
            $collection->timestamp('created_at')->comment('the date and time the high score entry was created');
            $collection->timestamp('updated_at')->comment('the date and time the high score entry was last updated');
        });
    }

    public function down()
    {
        Schema::dropIfExists('high_scores');
    }
};

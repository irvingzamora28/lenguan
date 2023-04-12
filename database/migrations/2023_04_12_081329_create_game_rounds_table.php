<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('game_rounds', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreign('game_session_id')->references('_id')->on('game_sessions');
            $collection->foreign('noun_id')->references('_id')->on('nouns');
            $collection->integer('player1_score')->comment('the score of player 1 for this round');
            $collection->integer('player2_score')->nullable()->comment('the score of player 2 for this round (if in multiplayer mode)');
            $collection->timestamp('created_at')->comment('the date and time the game round was created');
            $collection->timestamp('updated_at')->comment('the date and time the game round was last updated');
        });
    }

    public function down()
    {
        Schema::dropIfExists('game_rounds');
    }
};

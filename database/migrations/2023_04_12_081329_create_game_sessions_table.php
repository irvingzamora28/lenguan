<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('game_sessions', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreign('player1_id')->references('_id')->on('players');
            $collection->foreign('player2_id')->references('_id')->on('players');
            $collection->string('mode')->comment('game mode (either "single-player" or "multiplayer")');
            $collection->foreign('language_id')->references('_id')->on('languages');
            $collection->integer('difficulty_level')->comment('the chosen difficulty level for the game session');
            $collection->timestamp('created_at')->comment('the date and time the game session was created');
            $collection->timestamp('updated_at')->comment('the date and time the game session was last updated');
        });
    }

    public function down()
    {
        Schema::dropIfExists('game_sessions');
    }
};

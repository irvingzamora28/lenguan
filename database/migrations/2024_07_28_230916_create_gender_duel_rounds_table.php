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
        Schema::create('gender_duel_rounds', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreignId('room_id')->constrained('rooms');
            $collection->integer('round_number');
            $collection->string('word');
            $collection->string('correct_gender');
            $collection->array('player_responses')->comment('Array of player responses');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gender_duel_rounds');
    }
};

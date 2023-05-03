<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('players', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->string('username')->comment("the player's chosen username");
            $collection->string('email')->comment("the player's email address");
            $collection->string('password')->comment("the player's hashed password");
            $collection->array('languages');
            $collection->array('progress');
            $collection->timestamp('created_at')->comment('the date and time the player account was created');
            $collection->timestamp('updated_at')->comment('the date and time the player account was last updated');
        });
    }

    public function down()
    {
        Schema::dropIfExists('players');
    }
};

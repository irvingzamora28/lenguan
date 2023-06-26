<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('noun_translations', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreign('noun_id')->references('_id')->on('nouns')->nullable();
            $collection->foreign('language_id')->references('_id')->on('languages');
            $collection->string('translation')->comment('the translation of the noun in the base learning language');
            $collection->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('noun_translations');
    }
};

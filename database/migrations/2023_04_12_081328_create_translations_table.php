<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('translations', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->foreign('language_id')->references('_id')->on('languages');
            $collection->string('translation')->comment('the translation of the noun in the base learning language');
            $collection->foreign('translation_noun_id')->references('_id')->on('nouns')->nullable();
            $collection->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('translations');
    }
};

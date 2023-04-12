<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('nouns', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->string('word')->comment('the noun in the target language');
            $collection->string('gender')->comment('the gender of the noun (der, die, or das for German; el, la, los, las for Spanish; etc.)');
            $collection->foreign('language_id')->references('_id')->on('languages');
            $collection->integer('difficulty_level')->comment('the difficulty level of the noun (1 for beginner, 2 for intermediate, 3 for advanced)');
            $collection->foreign('translation_id')->references('_id')->on('translations')->nullable();
            $collection->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('nouns');
    }
};

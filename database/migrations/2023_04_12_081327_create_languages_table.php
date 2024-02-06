<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('languages', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->string('name')->comment('the name of the language (e.g., "German", "Spanish", "French")');
            $collection->string('code')->comment('the code of the language (e.g., "DE", "ES", "FR")');
            $collection->array('special_characters')->comment('any special characters used in the language (e.g. umlauts, accented letters)');
            $collection->array('courses')->comment('the courses that are available for this language');
        });
    }

    public function down()
    {
        Schema::dropIfExists('languages');
    }
};

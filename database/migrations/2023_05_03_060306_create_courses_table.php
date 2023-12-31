<?php

use Illuminate\Database\Migrations\Migration;
use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $collection) {
            $collection->id();
            $collection->string('name');
            $collection->string('description');
            $collection->string('image');
            $collection->foreignId('language_id')->constrained('languages');
            $collection->string('native_language_code', 3)->default("en")->comment('Native language code (es, en, de, fr, etc.');
            $collection->array('levels');
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
        Schema::dropIfExists('courses');
    }
};

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
        });
    }

    public function down()
    {
        Schema::dropIfExists('languages');
    }
};

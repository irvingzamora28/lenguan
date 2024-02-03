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
        Schema::create('tense_conjugations', function (Blueprint $collection) {
            $collection->id();
            $collection->string('tense');
            $collection->string('verb');
            $collection->embedsMany('conjugations', function (Blueprint $subcollection) {
                $subcollection->string('pronoun');
                $subcollection->string('conjugation');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tense_conjugations');
    }
};

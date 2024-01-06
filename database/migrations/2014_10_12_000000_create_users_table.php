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
        Schema::create('users', function (Blueprint $collection) {
            $collection->index('_id');
            $collection->string('name');
            $collection->string('email')->unique();
            $collection->string('username')->unique();
            $collection->timestamp('email_verified_at')->nullable();
            $collection->string('password');
            $collection->string('profile_image_path', 128);
            $collection->rememberToken();
            $collection->array('languages');
            $collection->foreignId('language_id')->nullable()->comment('Target language currently learning')->constrained('languages');
            $collection->string('native_language_code', 3)->default("en")->comment('Native language code (es, en, de, fr, etc.');
            $collection->foreignId('course_id')->nullable()->comment('Current course')->constrained('courses');
            $collection->array('progress');
            $collection->array('goals');
            $collection->string('learningStyle');
            $collection->array('personalizedLessons');
            $collection->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

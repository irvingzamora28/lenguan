<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use App\Models\Goal;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            ['name' => 'English', 'code' => 'en'],
            ['name' => 'Spanish', 'code' => 'es'],
            ['name' => 'German', 'code' => 'de'],
            ['name' => 'French', 'code' => 'fr'],
        ];

        $goals = [
            'Business Communication',
            'Travel',
            'Academic Study',
            'Cultural Exploration',
            'Other'
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }

        // German course
        $language = Language::where('name', 'German')->first();
        $courseData = [
            'name'      => 'German for Beginners',
            'image'     => 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'language_id' => $language->id,
            'description' => 'Learn German with bite-size lessons to help you get started.',
        ];

        $course = Course::create($courseData);
        foreach ($goals as $goalName) {
            $goal = new Goal(['name' => $goalName]);
            $course->goals()->save($goal);
        }

        // Spanish course
        $language = Language::where('name', 'Spanish')->first();

        $courseData = [
            'name'      => 'Spanish for Everyone',
            'image'     => 'https://images.unsplash.com/photo-1566232392379-afd9298e6a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'language_id' => $language->id,
            'description' => 'Explore Spanish language and culture, from basics to advanced fluency.',
        ];

        $course = Course::create($courseData);
        foreach ($goals as $goalName) {
            $goal = new Goal(['name' => $goalName]);
            $course->goals()->save($goal);
        }

        // English course for spanish learners
        $language = Language::where('name', 'English')->first();

        $courseData = [
            'name'      => 'Inglés para todos.',
            'image'     => 'https://images.unsplash.com/photo-1559517143-596',
            'language_id' => $language->id,
            'description' => 'Aprende inglés con lecciones pequeñas y prácticas para que puedas comenzar.',
            'native_language_code' => 'es',
        ];

        $course = Course::create($courseData);
        foreach ($goals as $goalName) {
            $goal = new Goal(['name' => $goalName]);
            $course->goals()->save($goal);
        }
    }
}

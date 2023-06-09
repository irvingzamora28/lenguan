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
            ['name' => 'English'],
            ['name' => 'Spanish'],
            ['name' => 'German'],
            ['name' => 'French'],
        ];

        foreach ($languages as $language) {
            Language::create($language);
        }

        $language = Language::where('name', 'German')->first();
        $course = [
            'name'      => 'German for Beginners',
            'image'     => 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'language_id' => $language->id,
            'description' => 'Learn German with bite-size lessons based on science.',
        ];

        $course = Course::create($course);

        $goals = [
            'Business Communication',
            'Travel',
            'Academic Study',
            'Cultural Exploration',
            'Other'
        ];
        foreach ($goals as $goal) {
            $goal = Goal::create(['name' => $goal]);
            $goal->language()->associate($language);
            $language->goals()->save($goal);
            $language->courses()->save($course);
        }
    }
}

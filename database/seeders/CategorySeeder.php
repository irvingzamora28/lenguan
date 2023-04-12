<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            'Animals',
            'Food & Drinks',
            'Transportation',
            'Technology',
            'Nature',
            'Clothing',
            'Furniture',
            'Sports',
            'Household',
            'Body',
            'School',
            'Professions',
            'People and Family',
            'Health',
            'Weather',
            'Time',
            'Numbers',
            'Colors',
            'Shapes',
            'Miscellaneous',
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}

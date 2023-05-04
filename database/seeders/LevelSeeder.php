<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $levels = [
            'Level 1',
            'Level 2',
            'Level 3',
            'Level 4',
        ];

        foreach ($levels as $level) {
            Level::create(['name' => $level]);
        }
    }
}

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
            'German Level 1',
            'German Level 2',
            'German Level 3',
            'German Level 4',
            'Spanish Level 1',
            'Spanish Level 2',
            'Spanish Level 3',
            'Inglés nivel 1',
            'Inglés nivel 2',
            'Inglés nivel 3',
        ];

        foreach ($levels as $level) {
            Level::create(['name' => $level]);
        }
    }
}

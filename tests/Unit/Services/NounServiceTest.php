<?php

namespace Tests\Unit\Services;

use App\Models\Noun;
use App\Models\Language;
use App\Models\NounTranslation;
use App\Services\NounService;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class NounServiceTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Clear database between tests
        Noun::truncate();
        Language::truncate();
        NounTranslation::truncate();
    }

    public function testCanGetAllNouns()
    {
        $nouns = Noun::factory()->count(5)->create();

        $service = new NounService();
        $allNouns = $service->getAllNouns();

        $this->assertEquals($nouns->count(), $allNouns->count());
    }

    public function testCanGetGenderDuelWords()
    {
        $quantity = 3;
        $nouns = Noun::factory()->count($quantity)->create(['difficulty_level' => 1]);
        $language = Language::factory()->create(['name' => 'English']);

        $nouns->each(function ($noun) use ($language) {
            NounTranslation::factory()->create(['noun_id' => $noun->id, 'language_id' => $language->id]);
        });

        $service = new NounService();
        $genderDuelWords = $service->getGenderDuelWords($quantity);

        $this->assertEquals($quantity, $genderDuelWords->count());
    }

    public function testCanGetNounById()
    {
        $noun = Noun::factory()->create();
        $service = new NounService();
        $foundNoun = $service->getNounById($noun->id);

        $this->assertEquals($noun->id, $foundNoun->id);
    }
}

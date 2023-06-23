<?php

namespace App\Http\Controllers;

use App\Models\Noun;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NounController extends Controller
{
    public function index()
    {
        $nouns = Noun::all();
        return response()->json($nouns);
    }

    public function genderDuelWords($quantity) : JsonResponse
    {
        $words = Noun::raw(function ($collection) use ($quantity) {
            return $collection->aggregate([
                ['$match' => ['difficulty_level' => 1]],
                ['$sample' => ['size' => (int)$quantity]],
            ]);
        });

        return response()->json($words);
    }

    public function show(Noun $noun)
    {
        return response()->json($noun);
    }
}

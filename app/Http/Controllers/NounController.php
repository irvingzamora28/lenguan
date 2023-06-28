<?php

namespace App\Http\Controllers;

use App\Models\Noun;
use App\Services\NounService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NounController extends Controller
{

    private $nounService;

    public function __construct(NounService $nounService)
    {
        $this->nounService = $nounService;
    }

    public function index()
    {
        $nouns = $this->nounService->getAllNouns();
        return response()->json($nouns);
    }

    public function genderDuelWords(Request $request) : JsonResponse
    {
        $quantity = $request->query('quantity', 20);
        $difficultyLevel = $request->query('difficulty_level', 1);

        $words = $this->nounService->getGenderDuelWords($quantity, $difficultyLevel);
        return response()->json($words);
    }

    public function show(Noun $noun)
    {
        $noun = $this->nounService->getNounById($noun->_id);
        return response()->json($noun);
    }
}
